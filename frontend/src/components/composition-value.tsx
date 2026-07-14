type CompositionValueProps = {
    label: string;
    value: string;
};

export function CompositionValue({ label, value }: CompositionValueProps) {
    return (
        <div className="flex min-w-0 gap-1 rounded bg-muted px-2 py-1">
            <span className="shrink-0 text-muted-foreground">{label}</span>
            <span className="truncate font-medium">{value}</span>
        </div>
    );
}