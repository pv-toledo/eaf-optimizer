type CompositionValueProps = {
    label: string;
    value: number;
};

export function CompositionValue({ label, value }: CompositionValueProps) {
    return (
        <div className="rounded bg-muted px-2 py-1">
            <span className="text-muted-foreground">{label}</span>{" "}
            <span className="font-medium">{value}</span>
        </div>
    );
}