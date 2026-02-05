interface LocationFormProps {
    onBack: () => void;
    onNext: () => void;
}

export function LocationForm({ onBack, onNext }: LocationFormProps) {
    return (
        <div>
            {/* Your form fields here */}
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Continue</button>
        </div>
    );
}