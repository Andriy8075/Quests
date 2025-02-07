import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';

export default function UploadAvatar({ className = '' }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [processing, setProcessing] = useState(false);

    const selectAvatar = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const uploadAvatar = async () => {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
            const formData = new FormData();
            formData.append('avatar', fileInput.files[0]);

            setProcessing(true);

            try {
                const response = await fetch(route('profile.avatar.upload'), {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                });

                if (response.ok) {
                    alert('Avatar uploaded successfully!');
                } else {
                    alert('Failed to upload avatar.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while uploading the avatar.');
            } finally {
                setProcessing(false);
            }
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Upload Avatar
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Select an image to preview before uploading your avatar.
                </p>
            </header>

            <div className="mt-6 space-y-4">
                <input type="file" accept="image/*" onChange={selectAvatar} className="block w-full text-sm text-gray-600" />
                {selectedImage && <img src={selectedImage} alt="Selected" className="mt-2 max-w-xs rounded-lg shadow" />}

                <PrimaryButton onClick={uploadAvatar} disabled={processing}>
                    {processing ? 'Uploading...' : 'Upload'}
                </PrimaryButton>
            </div>
        </section>
    );
}
