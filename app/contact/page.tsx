"use client";

import { useState } from "react";

interface FormFields {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
}

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (fields.fullName.trim().length < 3)
    errors.fullName = "Full name must be at least 3 characters.";
  if (fields.subject.trim().length < 3)
    errors.subject = "Subject must be at least 3 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Please enter a valid email address.";
  if (fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

export default function ContactPage() {
  const [fields, setFields] = useState<FormFields>({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-10 text-center text-gray-800">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="text-3xl font-bold mb-3">Message sent!</h1>
        <p className="text-gray-500">We will get back to you as soon as possible.</p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-10 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-10">Contact us</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={fields.fullName}
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={fields.subject}
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={fields.message}
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 resize-none"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Send message
        </button>
      </form>
    </main>
  );
}
