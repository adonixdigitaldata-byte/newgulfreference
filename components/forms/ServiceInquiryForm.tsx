"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, ShieldCheck, Send } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";

interface ServiceInquiryFormProps {
  locale: Locale;
  showSecurityNote?: boolean;
}

export const ServiceInquiryForm: React.FC<ServiceInquiryFormProps> = ({
  locale,
  showSecurityNote = true,
}) => {
  const tForms = CONTENT.forms[locale];
  const tServicesPage = CONTENT.servicesPage[locale];
  const isRtl = locale === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    service: tForms.serviceOptions[0],
    priority: tForms.priorityOptions[0],
    location: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.organization.trim()) {
      setStatus("error");
      setErrorMessage(tForms.errorMissing);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus("error");
      setErrorMessage(tForms.errorEmail);
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="bg-white rounded-editorial-lg border border-slate-200 p-8 sm:p-10 md:p-12 shadow-card">
      {status === "success" ? (
        <div className="p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan text-white flex items-center justify-center mb-5 shadow-lg shadow-brand-blue/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            {tForms.successTitle}
          </h3>
          <p className="text-sm text-slate-600 max-w-md mb-8 leading-relaxed">
            {tForms.successDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setStatus("idle");
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  organization: "",
                  service: tForms.serviceOptions[0],
                  priority: tForms.priorityOptions[0],
                  location: "",
                  message: "",
                });
              }}
              className="px-7 py-3 text-xs font-bold text-brand-blue bg-blue-50 border border-blue-200/80 rounded-full hover:bg-blue-100 transition-colors"
            >
              {isRtl ? "إرسال استفسار آخر" : "Submit another inquiry"}
            </button>
            <a
              href={CONTENT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 text-xs font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all"
            >
              {isRtl ? "متابعة عبر واتساب" : "Follow up on WhatsApp"}
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-xs text-rose-700 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                {tForms.name} <span className="text-brand-blue">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={tForms.namePlaceholder}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                {tForms.email} <span className="text-brand-blue">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={tForms.emailPlaceholder}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                {tForms.phone}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={tForms.phonePlaceholder}
                dir="ltr"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-left rtl:text-right"
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                {tForms.organization} <span className="text-brand-blue">*</span>
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder={tForms.organizationPlaceholder}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                {tForms.service}
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              >
                {tForms.serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                {tForms.priority}
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              >
                {tForms.priorityOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location in Saudi Arabia */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              {tForms.location}
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder={tForms.locationPlaceholder}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              {tForms.message}
            </label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={tForms.messagePlaceholder}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-gradient-to-r from-brand-blue via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-full shadow-lg shadow-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/40 transition-all disabled:opacity-50"
            >
              <span>
                {status === "submitting" ? tForms.submitting : tForms.submit.replace(" ↗", "")}
              </span>
              <Send
                className={`w-4 h-4 ${
                  isRtl ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Security Note */}
          {showSecurityNote && (
            <div className="pt-4 border-t border-slate-100 flex items-start gap-3 text-xs text-slate-500 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <span>{tServicesPage.formSecurity}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};
