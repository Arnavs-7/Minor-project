import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { login, verifyOtp } = useAuth();
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step === "OTP" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Reset state when modal closes/opens
  useEffect(() => {
    if (isOpen) {
      setStep("PHONE");
      setPhone("");
      setOtp("");
      setTimer(30);
    }
  }, [isOpen]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setIsLoading(true);
    await login(phone);
    setIsLoading(false);
    setStep("OTP");
    setTimer(30);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;
    setIsLoading(true);
    const success = await verifyOtp(otp);
    setIsLoading(false);
    if (success) {
      onClose();
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setIsLoading(true);
    await login(phone);
    setIsLoading(false);
    setTimer(30);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-background border border-border p-6 shadow-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="font-heading text-2xl tracking-wide">
            {step === "PHONE" ? "Welcome Back" : "Verify Phone"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-light text-sm mt-2">
            {step === "PHONE"
              ? "Enter your phone number to login or securely create an account."
              : `Enter the 6-digit code sent to ${phone}`}
          </DialogDescription>
        </DialogHeader>

        {step === "PHONE" ? (
          <form onSubmit={handleSendOtp} className="space-y-6 mt-4">
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                Phone Number
              </label>
              <div className="flex bg-muted/30 border border-border px-3 py-2 rounded-sm focus-within:border-foreground transition-colors">
                <span className="text-muted-foreground select-none pr-3 border-r border-border mr-3 flex items-center text-sm font-light">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  className="w-full bg-transparent outline-none text-sm font-light placeholder:text-muted-foreground/60"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  autoFocus
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || phone.length < 10}
              className="w-full bg-foreground text-background py-3 text-xs tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-11"
            >
              {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6 mt-4 flex flex-col items-center">
            <div className="flex justify-center w-full my-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp} autoFocus>
                <InputOTPGroup className="gap-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <InputOTPSlot
                      key={idx}
                      index={idx}
                      className="w-10 h-12 text-lg border-border border rounded-sm focus-visible:ring-1 focus-visible:ring-foreground"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 6}
              className="w-full bg-foreground text-background py-3 text-xs tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-11"
            >
              {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Verify & Login"}
            </button>

            <div className="text-center w-full text-sm font-light">
              {timer > 0 ? (
                <span className="text-muted-foreground">Resend code in <span className="text-foreground font-medium">00:{timer.toString().padStart(2, '0')}</span></span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground transition-all"
                >
                  Resend OTP
                </button>
              )}
            </div>
            <div className="w-full text-center">
              <button 
                type="button" 
                onClick={() => setStep("PHONE")}
                className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
               >
                Change Phone Number
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
