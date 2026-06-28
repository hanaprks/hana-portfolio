"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ContactData {
  email: string;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
}

interface ContactSectionProps {
  data: ContactData | null;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const contactEmail = data?.email || "hana@example.com";
  const contactPhone = data?.phone || "";
  const contactWA = data?.whatsapp || "";
  const contactAddress = data?.address || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success("Pesan Anda berhasil dikirim! Terima kasih.");
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/10 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-left space-y-3 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">Get in Touch</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Contact Channels
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            Have a project or want to collaborate? Drop a message or reach out on my channels.
          </p>
        </div>

        {/* Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              
              {/* Email channel */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 font-mono">Email Address</h4>
                  <a href={`mailto:${contactEmail}`} className="text-sm font-bold text-foreground hover:text-primary transition break-all">
                    {contactEmail}
                  </a>
                </div>
              </div>

              {/* Whatsapp/Phone channel */}
              {(contactPhone || contactWA) && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 font-mono">Direct Contact</h4>
                    {contactWA ? (
                      <a
                        href={`https://wa.me/${contactWA.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-foreground hover:text-primary transition block"
                      >
                        📱 Chat via WhatsApp
                      </a>
                    ) : null}
                    {contactPhone && (
                      <a href={`tel:${contactPhone}`} className="text-sm font-bold text-foreground hover:text-primary transition block">
                        📞 {contactPhone}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Address channel */}
              {contactAddress && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 font-mono">Office Address</h4>
                    <p className="text-sm font-bold text-foreground">
                      {contactAddress}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Contact form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 md:p-8 rounded-3xl border border-border bg-card/65 shadow-sm space-y-5">
            
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Full Name</Label>
              <Input
                id="name"
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl bg-card border-border text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl bg-card border-border text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your project overview or message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-xl bg-card border-border text-sm min-h-[120px] resize-y"
              />
            </div>

            <Button
              type="submit"
              disabled={isSending}
              className="w-full rounded-xl font-bold text-sm gap-2 shadow-md animate-none"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </Button>
          </form>

        </div>

      </div>
    </section>
  );
}
