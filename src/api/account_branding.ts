'use server'

import axios from "axios";
import stripe from "./stripe";
import { AccountBranding, BrandingFile } from "./types";
import { StripeError } from "@stripe/stripe-js";
import Stripe from "stripe";

const getBrandingFile = async (file_id: string) : Promise<BrandingFile> => {
    const file = await stripe.files.retrieve(file_id)
    return {
        name: file.filename || '',
        type: file.type || '',
        src: file.url ? await axios
        .get(file.url, { responseType: 'arraybuffer', headers: {
            'Authorization': 'Basic ' + btoa(process.env.STRIPE_SECRET_KEY + ':' || '')
        }})
        .then(response => {
            const base64Image = `data:${response.headers['content-type']};base64,` + Buffer.from(response.data).toString('base64');
            return base64Image
        })
         : '',
      
    }
}

const uploadBrandingFile = async (file: File, purpose: 'logo' | 'icon') : Promise<string> => {
    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const stripeFile = await stripe.files.create({
            file: {
                data: buffer,
                name: file.name,
                type: 'application.octet-stream',
            },
            purpose: purpose === 'logo' ? 'business_logo' : 'business_icon',
        });
        return stripeFile.id;
    } catch (error: StripeError | any) {
        // Extract Stripe's specific error message
        if (error.type === 'StripeInvalidRequestError') {
            throw new Error(error.message || 'Invalid file format or specifications');
        } else if (error.type === 'StripeFileUploadError') {
            throw new Error(error.message || 'File upload failed');
        } else {
            throw new Error(error.message || 'Failed to upload file');
        }
    }
}

const getAccountBranding = async (account_id: string) : Promise<AccountBranding> => {
  const branding = (await stripe.accounts.retrieve(account_id)).settings?.branding;
  if (branding) {
    return {
        icon: branding.icon ?  await getBrandingFile(branding.icon as string) : undefined,
        logo: branding.logo ? await getBrandingFile(branding.logo as string) : undefined,
        primary_color: branding.primary_color || '',
        secondary_color: branding.secondary_color || ''
    }
  }
  return {
    primary_color: '',
    secondary_color: ''
  }
};

const updateAccountBranding = async (
  account_id: string, 
  updates: {
    primary_color?: string;
    secondary_color?: string;
    logoFileId?: string;
    iconFileId?: string;
  }
) : Promise<void> => {
  const updateData: Stripe.AccountUpdateParams = {
    settings: {
      branding: {}
    }
  };

  // Handle color updates
  if (updates.primary_color !== undefined) {
    updateData.settings!.branding!.primary_color = updates.primary_color;
  }
  if (updates.secondary_color !== undefined) {
    updateData.settings!.branding!.secondary_color = updates.secondary_color;
  }

  // Handle image updates
  if (updates.logoFileId !== undefined) {
    updateData.settings!.branding!.logo = updates.logoFileId;
  }
  if (updates.iconFileId !== undefined) {
    updateData.settings!.branding!.icon = updates.iconFileId;
  }

  await stripe.accounts.update(account_id, updateData);
};

const uploadBrandingImages = async (accountId: string, logoFile?: File, iconFile?: File) : Promise<{ logoFileId?: string, iconFileId?: string, errors?: string[] }> => {
  let logoFileId: string | undefined;
  let iconFileId: string | undefined;
  const errors: string[] = [];

  // Upload logo if provided
  if (logoFile) {
    try {
      logoFileId = await uploadBrandingFile(logoFile, 'logo');
    } catch (error: any) {
      errors.push(`Logo: ${error.message}`);
    }
  }

  // Upload icon if provided
  if (iconFile) {
    try {
      iconFileId = await uploadBrandingFile(iconFile, 'icon');
    } catch (error: any) {
      errors.push(`Icon: ${error.message}`);
    }
  }

  // Only update branding if at least one file was uploaded successfully
  if (logoFileId || iconFileId) {
    await updateAccountBranding(accountId, { logoFileId, iconFileId });
  }

  return { logoFileId, iconFileId, errors: errors.length > 0 ? errors : undefined };
};

const handleBrandingUpload = async (formData: FormData) : Promise<{ success: boolean, logoFileId?: string, iconFileId?: string, error?: string, errors?: string[] }> => {
  try {
    const accountId = formData.get('accountId') as string;
    const logoFile = formData.get('logo') as File | null;
    const iconFile = formData.get('icon') as File | null;

    if (!accountId) {
      return { success: false, error: 'Account ID is required' };
    }

    const result = await uploadBrandingImages(accountId, logoFile || undefined, iconFile || undefined);

    // Check if there were any errors during upload
    if (result.errors && result.errors.length > 0) {
      return { 
        success: false, 
        error: 'Some files failed to upload',
        errors: result.errors
      };
    }

    return { 
      success: true, 
      logoFileId: result.logoFileId,
      iconFileId: result.iconFileId
    };

  } catch (error: any) {
    console.error('Error uploading branding files:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to upload branding files' 
    };
  }
};

export { getAccountBranding, updateAccountBranding, uploadBrandingFile, uploadBrandingImages, handleBrandingUpload };