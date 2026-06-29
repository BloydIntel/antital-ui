import { TYPOGRAPHY } from "@/constants/styles";
import { useAddPaymentMethod } from "@/hooks/use-payment-methods";
import { getApiPrimaryMessage } from "@/lib/api-error";
import type { PaymentMethodType } from "@/types/payment-method";
import { CreditCardIcon, Landmark, XIcon } from "lucide-react";
import { useState } from "react";

interface AddPaymentMethodModalProps {
    onClose: () => void;
}

type Step = "pick" | "form";

const CARD_BRANDS = ["Visa", "Mastercard", "Verve"] as const;

export function AddPaymentMethodModal({ onClose }: AddPaymentMethodModalProps) {
    const [step, setStep] = useState<Step>("pick");
    const [selectedType, setSelectedType] = useState<PaymentMethodType>("Bank");
    const [title, setTitle] = useState("");
    const [providerName, setProviderName] = useState("");
    const [last4, setLast4] = useState("");
    const [setAsDefault, setSetAsDefault] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const addMutation = useAddPaymentMethod();

    const selections = [
        {
            type: "Bank" as const,
            title: "Add bank account",
            description: "Connect a regular bank account",
            icon: <Landmark className="w-5 h-5 text-black" />,
        },
        {
            type: "Card" as const,
            title: "Add debit card",
            description: "Connect your Mastercard, VISA or VERVE card",
            icon: <CreditCardIcon className="w-5 h-5 text-black" />,
        },
    ];

    const openForm = (type: PaymentMethodType) => {
        setSelectedType(type);
        setTitle(type === "Bank" ? "" : "Debit Card");
        setProviderName(type === "Card" ? "Visa" : "");
        setLast4("");
        setFormError(null);
        setStep("form");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormError(null);

        try {
            await addMutation.mutateAsync({
                type: selectedType,
                title: title.trim(),
                providerName: providerName.trim(),
                last4: last4.trim(),
                setAsDefault,
            });
            onClose();
        } catch (error) {
            setFormError(getApiPrimaryMessage(error, "Unable to add payment method."));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="bg-white w-full max-w-[536px] rounded-2xl border border-[#EAEAEA] shadow-xl relative z-10 p-6 md:p-8 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5 text-[#1F1F1F]">
                        <CreditCardIcon className="w-5 h-5 text-black" />
                        <h3 className="text-[18px] font-medium" style={TYPOGRAPHY.body}>
                            {step === "pick" ? "Add Payment Method" : selections.find(s => s.type === selectedType)?.title}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-[#717171] hover:text-black hover:bg-gray-100 transition-all cursor-pointer"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                {step === "pick" ? (
                    <div className="space-y-4">
                        {selections.map((opt) => (
                            <button
                                key={opt.type}
                                onClick={() => openForm(opt.type)}
                                className="w-full border border-[#EAEAEA] rounded-xl p-4 flex items-center justify-between text-left hover:border-black/30 hover:bg-[#F9FAFB] transition-all group cursor-pointer"
                            >
                                <div className="space-y-1">
                                    <h4 className="text-[16px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                                        {opt.title}
                                    </h4>
                                    <p className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>
                                        {opt.description}
                                    </p>
                                </div>

                                <div className="w-10 h-10 bg-[#E6EAE9] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#DCDCDC] transition-colors">
                                    {opt.icon}
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[14px] text-[#505050] mb-1" style={TYPOGRAPHY.body}>
                                {selectedType === "Bank" ? "Account label" : "Card label"}
                            </label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={selectedType === "Bank" ? "GTBank Savings Account" : "Visa Debit Card"}
                                className="w-full border border-[#EAEAEA] rounded-lg px-3 py-2 text-[14px]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[14px] text-[#505050] mb-1" style={TYPOGRAPHY.body}>
                                {selectedType === "Bank" ? "Bank name" : "Card brand"}
                            </label>
                            {selectedType === "Bank" ? (
                                <input
                                    value={providerName}
                                    onChange={(e) => setProviderName(e.target.value)}
                                    placeholder="Guaranty Trust Bank"
                                    className="w-full border border-[#EAEAEA] rounded-lg px-3 py-2 text-[14px]"
                                    required
                                />
                            ) : (
                                <select
                                    value={providerName}
                                    onChange={(e) => setProviderName(e.target.value)}
                                    className="w-full border border-[#EAEAEA] rounded-lg px-3 py-2 text-[14px] bg-white"
                                    required
                                >
                                    {CARD_BRANDS.map((brand) => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div>
                            <label className="block text-[14px] text-[#505050] mb-1" style={TYPOGRAPHY.body}>
                                Last 4 digits
                            </label>
                            <input
                                value={last4}
                                onChange={(e) => setLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                placeholder="5678"
                                inputMode="numeric"
                                pattern="\d{4}"
                                className="w-full border border-[#EAEAEA] rounded-lg px-3 py-2 text-[14px]"
                                required
                            />
                        </div>

                        <label className="flex items-center gap-2 text-[14px] text-[#505050]">
                            <input
                                type="checkbox"
                                checked={setAsDefault}
                                onChange={(e) => setSetAsDefault(e.target.checked)}
                            />
                            Set as default payment method
                        </label>

                        {formError ? (
                            <p className="text-[14px] text-red-600">{formError}</p>
                        ) : null}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setStep("pick")}
                                className="flex-1 border border-[#EAEAEA] rounded-lg py-2.5 text-[14px] font-medium"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={addMutation.isPending}
                                className="flex-1 bg-[#042E27] text-white rounded-lg py-2.5 text-[14px] font-medium disabled:opacity-50"
                            >
                                {addMutation.isPending ? "Saving..." : "Save Payment Method"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
