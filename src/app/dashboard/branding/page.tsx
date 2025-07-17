'use client'
import { getAccountBranding, updateAccountBranding, handleBrandingUpload } from '@/api/account_branding';
import { AccountBranding } from '@/api/types';
import { useAccountData } from '@/hooks/useAccountData'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StripeError } from '@stripe/stripe-js';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

const Branding = () => {
    const { account_id } = useAccountData()
    const [branding, setBranding] = useState<AccountBranding>()
    const [primaryColor, setPrimaryColor] = useState('')
    const [secondaryColor, setSecondaryColor] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isInitialLoading, setIsInitialLoading] = useState(true)
    const [uploadError, setUploadError] = useState<string>('')
    const [uploadErrors, setUploadErrors] = useState<string[]>([])
    const logoFileRef = useRef<HTMLInputElement>(null)
    const iconFileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchBranding = async (id: string) => {
            setIsInitialLoading(true)
            try {
                const branding = await getAccountBranding(id)
                setBranding(branding)
                setPrimaryColor(branding.primary_color || '')
                setSecondaryColor(branding.secondary_color || '')
            } catch (error) {
                console.error('Failed to fetch branding:', error)
            } finally {
                setIsInitialLoading(false)
            }
        }
        if (account_id) {
            fetchBranding(account_id)
        } else {
            setIsInitialLoading(false)
        }
    }, [account_id])

    const handleColorUpdate = async () => {
        if (!account_id) return
        
        setIsLoading(true)
        try {
            await updateAccountBranding(account_id, { primary_color: primaryColor, secondary_color: secondaryColor })
            // Refresh branding data
            const updatedBranding = await getAccountBranding(account_id)
            setBranding(updatedBranding)
        } catch (error) {
            console.error('Failed to update branding colors:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleImageUpload = async (file: File, type: 'logo' | 'icon') => {
        if (!account_id || !file) return

        setIsUploading(true)
        setUploadError('')
        setUploadErrors([])
        
        try {
            const formData = new FormData()
            formData.append('accountId', account_id)
            
            if (type === 'logo') {
                formData.append('logo', file)
            } else {
                formData.append('icon', file)
            }

            const result = await handleBrandingUpload(formData)

            if (!result.success) {
                setUploadError(result.error || 'Failed to upload image')
                if (result.errors) {
                    setUploadErrors(result.errors)
                }
                return
            }

            // Refresh branding data
            const updatedBranding = await getAccountBranding(account_id)
            setBranding(updatedBranding)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: StripeError | any) {
            console.error('Failed to upload image:', error)
            setUploadError(error.message || 'Failed to upload image')
        } finally {
            setIsUploading(false)
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'icon') => {
        const file = event.target.files?.[0]
        if (file) {
            handleImageUpload(file, type)
        }
    }

    // Loading spinner component
    const LoadingSpinner = () => (
        <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading branding settings...</span>
        </div>
    );

    if (isInitialLoading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8">Branding Settings</h1>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Branding Settings</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Logo Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Logo</h2>
                    {isUploading && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                <span className="text-sm text-blue-700">Uploading logo...</span>
                            </div>
                        </div>
                    )}
                    {branding?.logo?.src ? (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Image 
                                    src={branding.logo.src} 
                                    alt="Logo" 
                                    width={100} 
                                    height={100}
                                    className="rounded-lg border"
                                />
                                <div>
                                    <p className="text-sm text-gray-600">{branding.logo.name}</p>
                                    <p className="text-xs text-gray-500">{branding.logo.type}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => logoFileRef.current?.click()}
                                disabled={isUploading}
                                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploading ? 'Uploading...' : 'Change Logo'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <p className="text-gray-500 mb-4">No logo uploaded</p>
                                <button
                                    onClick={() => logoFileRef.current?.click()}
                                    disabled={isUploading}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? 'Uploading...' : 'Upload Logo'}
                                </button>
                            </div>
                        </div>
                    )}
                    <input
                        ref={logoFileRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'logo')}
                        className="hidden"
                    />
                </div>

                {/* Icon Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Icon</h2>
                    {isUploading && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                <span className="text-sm text-blue-700">Uploading icon...</span>
                            </div>
                        </div>
                    )}
                    {branding?.icon?.src ? (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Image 
                                    src={branding.icon.src} 
                                    alt="Icon" 
                                    width={100} 
                                    height={100}
                                    className="rounded-lg border"
                                />
                                <div>
                                    <p className="text-sm text-gray-600">{branding.icon.name}</p>
                                    <p className="text-xs text-gray-500">{branding.icon.type}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => iconFileRef.current?.click()}
                                disabled={isUploading}
                                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploading ? 'Uploading...' : 'Change Icon'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <p className="text-gray-500 mb-4">No icon uploaded</p>
                                <button
                                    onClick={() => iconFileRef.current?.click()}
                                    disabled={isUploading}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? 'Uploading...' : 'Upload Icon'}
                                </button>
                            </div>
                        </div>
                    )}
                    <input
                        ref={iconFileRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'icon')}
                        className="hidden"
                    />
                </div>

                {/* Color Settings Section */}
                <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Brand Colors</h2>
                    
                    <div className="space-y-4">
                        {/* Primary Color */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Primary Color
                            </label>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="color"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    placeholder="#000000"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Secondary Color */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Secondary Color
                            </label>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="color"
                                    value={secondaryColor}
                                    onChange={(e) => setSecondaryColor(e.target.value)}
                                    className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={secondaryColor}
                                    onChange={(e) => setSecondaryColor(e.target.value)}
                                    placeholder="#000000"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Color Preview</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div 
                                        className="w-full h-16 rounded-lg mb-2 border"
                                        style={{ backgroundColor: primaryColor || '#f3f4f6' }}
                                    ></div>
                                    <p className="text-xs text-gray-600">Primary</p>
                                </div>
                                <div className="text-center">
                                    <div 
                                        className="w-full h-16 rounded-lg mb-2 border"
                                        style={{ backgroundColor: secondaryColor || '#f3f4f6' }}
                                    ></div>
                                    <p className="text-xs text-gray-600">Secondary</p>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleColorUpdate}
                            disabled={isLoading}
                            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Saving...
                                </div>
                            ) : (
                                'Save Colors'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {(uploadError || uploadErrors.length > 0) && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-red-800 mb-2">Upload Errors</h3>
                    {uploadError && (
                        <p className="text-sm text-red-700 mb-2">{uploadError}</p>
                    )}
                    {uploadErrors.length > 0 && (
                        <ul className="text-sm text-red-700 space-y-1">
                            {uploadErrors.map((error, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    {error}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}


        </div>
    );
};

export default Branding;