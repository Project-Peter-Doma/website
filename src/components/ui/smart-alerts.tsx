// src/components/ui/smart-alerts.tsx
"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './button';
import { Input } from './input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Send, CheckCircle } from 'lucide-react';

export const SmartAlerts = ({ domain }: { domain: string }) => {
  const [telegramHandle, setTelegramHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;

  const handleSubscribe = () => {
    if (!telegramHandle.trim() || !telegramHandle.startsWith('@')) {
      toast.error("Invalid Telegram Handle", {
        description: "Please enter a valid handle starting with '@'.",
      });
      return;
    }

    setIsSubmitting(true);
    
    // In a real app, you would save the mapping of `telegramHandle` to the `domain`
    // in your database here via an API call.
    
    setTimeout(() => {
      // This creates the special link.
      // It opens Telegram and pre-fills the message box with a unique command.
      const messageText = `/start watch_${domain.replace(/\./g, '_')}_${telegramHandle.replace('@', '')}`;
      const encodedMessage = encodeURIComponent(messageText);
      const telegramUrl = `https://t.me/${botUsername}?start=${encodedMessage}`;

      // Open the link in a new tab.
      window.open(telegramUrl, '_blank');

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Redirecting to Telegram...", {
        description: "Click 'Send' in Telegram to confirm your subscription.",
      });
    }, 1500); // Simulate API call
  };

  if (isSuccess) {
     return (
         <Card className="bg-zinc-900 border border-zinc-700 h-full flex flex-col justify-center items-center text-center">
              <CardContent className="pt-6">
                 <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                 <p className="font-semibold text-white">Check Your Telegram!</p>
                 <p className="text-sm text-zinc-400 mt-2">
                     Click "Start" or "Send" in the chat with @{botUsername} to activate alerts for {domain}.
                 </p>
             </CardContent>
         </Card>
     )
  }

  return (
    <Card className="bg-zinc-900 border border-zinc-800 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Send className="w-5 h-5 text-purple-400" />
          Smart Alerts
        </CardTitle>
        <CardDescription>
          Get instant on-chain alerts for this domain via Telegram.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-xs text-zinc-400">
             Enter your Telegram handle to get started.
          </p>
          <Input
            type="text"
            placeholder="@your_handle"
            value={telegramHandle}
            onChange={(e) => setTelegramHandle(e.target.value)}
            disabled={isSubmitting}
            className="bg-zinc-800 border-zinc-700 focus:ring-purple-500"
          />
          <Button
            onClick={handleSubscribe}
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSubmitting ? "Connecting..." : "Subscribe to Alerts"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};