"use client";

import { createAccount } from "@/api/accounts";
import { CreateAccountProps } from "@/api/types";
import Input from "@/components/input";
import { useAccountData } from "@/hooks/useAccountData";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const person: CreateAccountProps["person"] = {
  first_name: "Olivia",
  last_name: "Crawford",
  address: {
    line1: "address_full_match",
    city: "London",
    country: "GB",
    postal_code: "SW1A 2AB",
  },
  dob: {
    year: 1901,
    month: 1,
    day: 1,
  },
  email: "olivia@lloyds.co.uk",
  phone: "+44345 300 0000",
  relationship: {
    director: true,
    executive: true,
    owner: true,
    representative: true,
    title: "CEO",
  },
  verification: {
    document: {
      front: "file_identity_document_success",
    },
  },
};

const onboardingTypes: { name: string; kyc: CreateAccountProps }[] = [
  {
    name: "Full KYC Provided",
    kyc: {
      account: {
        business_type: "company",
        company: {
          address: {
            line1: "address_full_match",
            city: "London",
            country: "GB",
            postal_code: "SW1A 2AB",
          },
          tax_id: "000000000",
          phone: "+44345 300 0000",
          directors_provided: true,
          owners_provided: true,
          executives_provided: true,
        },
        business_profile: {
          mcc: "5814",
          url: "https://accessible.stripe.com",
          product_description: "I sell things in my shop",
          support_phone: "+44345 300 0000",
        },
        external_account: {
          object: "bank_account",
          country: "GB",
          currency: "gbp",
          account_holder_name: "Olivia Crawford",
          account_number: "00012345",
          routing_number: "108800",
        },
      },
      person,
    },
  },
  {
    name: "Partial KYC Provided",
    kyc: {
      account: {
        business_type: "individual",
        company: {
          address: {
            line1: "address_full_match",
            city: "London",
            country: "GB",
            postal_code: "SW1A 2AB",
          },
          tax_id: "000000000",
          phone: "+44345 300 0000",
        },
        business_profile: {
          url: "https://accessible.stripe.com",
        },
        external_account: {
          object: "bank_account",
          country: "GB",
          currency: "gbp",
          account_holder_name: "Olivia Crawford",
          account_number: "00012345",
          routing_number: "108800",
        },
      },
      person,
    },
  },
];

interface InputAccountInfo {
  company_name?: string;
}

const SignUp = () => {
  const { setAccountData } = useAccountData();
  const router = useRouter();
  const [inputAccountInfo, setInputAccountInfo] =
    React.useState<InputAccountInfo>();
  const [loading, setLoading] = React.useState(false);
  const [valid, setValid] = React.useState(true);

  const handleChange = React.useCallback((info: Partial<InputAccountInfo>) => {
    if (Object.values(info).every(Boolean)) {
      setValid(true);
    }
    setInputAccountInfo((p) => ({ ...p, ...info }));
  }, []);

  const beginOnboarding = async (accountInfo: CreateAccountProps) => {
    if (!inputAccountInfo?.company_name) {
      setValid(false);
    } else {
      setLoading(true);
      const data: CreateAccountProps = {
        ...accountInfo,
        account: {
          ...accountInfo.account,
          business_profile: {
            ...accountInfo.account.business_profile,
            name: inputAccountInfo.company_name,
          },
          company: {
            ...accountInfo.account.company,
            name: inputAccountInfo.company_name,
          },
        },
      };
      const { account_id } = await createAccount(data);
      setAccountData({
        account_id,
        business_name: inputAccountInfo.company_name,
      });
      router.push("/onboard");
    }
  };

  return (
    <div>
      <div className="max-w-sm m-auto p-4 bg-white border-t-2 border-lloyds-green mb-4">
        <Input
          title="Company Name"
          type="text"
          value={inputAccountInfo?.company_name}
          setValue={(company_name) => handleChange({ company_name })}
          errorMessage="Please enter a company name"
          valid={!!inputAccountInfo?.company_name || valid}
        />
      </div>
      <div className="flex flex-row m-auto h-auto justify-evenly">
        {onboardingTypes.map((type, i) => {
          return (
            <div
              key={i}
              className="flex flex-col border-t-2 border-lloyds-green bg-white min-w-60 items-center"
            >
              <div className="flex flex-col p-4">
                <span className="font-bold text-lloyds-green">{type.name}</span>
                <code className="max-h-[50vh] overflow-scroll">
                  <SyntaxHighlighter
                    customStyle={{ backgroundColor: "white" }}
                    language="json"
                    style={docco}
                  >
                    {JSON.stringify(type.kyc, null, 4)}
                  </SyntaxHighlighter>
                </code>
              </div>
              <div
                className="flex flex-row justify-between items-center bg-lloyds-light-green p-2 w-full cursor-pointer"
                onClick={() => (loading ? null : beginOnboarding(type.kyc))}
              >
                <span className="text-white pr-2">
                  {loading ? "Loading ..." : "Start onboarding"}
                </span>
                <ChevronRight className="text-white size-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SignUp;
