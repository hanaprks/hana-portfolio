"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    <section id="contact" className="py-24 md:py-32 bg-muted/10 border-t border-border/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left space-y-3 max-w-2xl"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">[ Contact ]</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground uppercase leading-[1.05]">
            Let&apos;s Build Something Meaningful Together.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            Have a project, operational bottleneck, or dashboard showcase requirement? Reach out on my channels.
          </p>
        </motion.div>

        {/* Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          
          {/* Left Column: Direct channels */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8 text-left"
          >
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
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 font-mono">Office Location</h4>
                    <p className="text-sm font-bold text-foreground">
                      {contactAddress}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </motion.div>

          {/* Right Column: Contact form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 p-6 md:p-8 rounded-[32px] border border-border bg-card/65 shadow-sm space-y-5"
          >
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
              className="w-full rounded-xl font-bold text-xs uppercase tracking-wider gap-2 py-6 shadow-md transition-all hover:translate-y-[-2px] duration-300 animate-none"
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
          </motion.form>

        </div>

      </div>
    </section>
  );
}
