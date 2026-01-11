import { useEffect, useId, useState } from 'preact/hooks';
import UploadFileBtn from './upload-file-btn';
import Placeholder from '@/assets/images/shared/placeholder.webp'

type FormImageProps = {
    src?: string;
    isEdited: boolean;
    onChange: (file: File | null) => void;
    error?: string;
    label?: string;
};

export default function FormImage({
    src,
    isEdited,
    onChange,
    error,
    label = 'Главное фото',
}: FormImageProps) {
    const [preview, setPreview] = useState(src);
    const id = useId();

    useEffect(() => {
        const resetImage = () => setPreview(src);

        document.addEventListener('media:clear', resetImage);
        return () => document.removeEventListener('media:clear', resetImage);
    }, [src]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        onChange(file);
    };

    const [showPopup, setShowPopup] = useState(false);

    return (
        <div>
            <p className="mb-2 text-center font-medium sm:text-base md:text-left">
                {label}
            </p>
            <div className="flex max-w-150 flex-col items-center justify-start gap-10 md:flex-row">
                {isEdited && (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="mt-1 hidden"
                        id={id}
                        name={`image-input-${id}`}
                    />
                )}

                <div className="shrink-0">
                    <UploadFileBtn
                        id={id}
                        disabled={!isEdited}
                        label="Загрузить фото"
                    />

                </div>
                <div>
                    <div
                        onClick={() => setShowPopup(true)}
                        className="transition-transform relative flex size-50 cursor-pointer items-center justify-center duration-200 ease hover:scale-110"
                    >
                        <img
                            src={preview ?? Placeholder}
                            alt="Preview"
                            className="h-full w-full rounded object-cover"
                        />
                    </div>
                    {error && (
                        <span className="block max-w-50 text-sm font-medium text-red-500">
                            {error}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
