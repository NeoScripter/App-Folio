import { cn } from '@/utils/cn';
import { NodeProps } from '@/lib/types/nodeProps';
import { FC } from 'preact/compat';

type MockupPickerProps = NodeProps & {
    value: number;
    onChange: (mockup: number) => void;
    error?: string;
};

const MockupPicker: FC<MockupPickerProps> = ({ className, value, onChange, error }) => {
    const mockups = [1, 2, 3, 4, 5, 6];

    return (
        <div className={cn('grid gap-4', className)}>
            <label className="ml-1 text-base font-medium">Select Mockup</label>

            <div className="grid grid-cols-3 gap-4">
                {mockups.map((mockup) => (
                    <button
                        key={mockup}
                        type="button"
                        onClick={() => onChange(mockup)}
                        className={cn(
                            'group relative aspect-square overflow-hidden rounded-lg border-2 transition-all hover:scale-105',
                            value === mockup
                                ? 'border-accent ring-2 ring-accent/50'
                                : 'border-gray-300 hover:border-accent/50'
                        )}
                    >
                        <img
                            src={`/models/mockups/mockup-${mockup}.webp`}
                            alt={`Mockup ${mockup}`}
                            className="size-full object-cover"
                        />

                        {/* Overlay */}
                        <div
                            className={cn(
                                'absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity',
                                value === mockup ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                            )}
                        >
                            <span className="text-5xl font-bold text-white">
                                {mockup}
                            </span>
                        </div>

                        {/* Selected indicator */}
                        {value === mockup && (
                            <div className="absolute right-2 top-2 flex size-12 items-center justify-center rounded-full bg-muted/60 text-white">
                                <svg
                                    className="size-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {error && (
                <p className="ml-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default MockupPicker;
