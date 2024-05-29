'use client';

import { Label } from './ui/label';
import { Input } from './ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const phoneRegExp = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

interface PhoneLoginFormProps {
  validation: {
    phone: {
      refine: string;
    };
    dic: {
      title: string;
      description: string;
      labels: string[];
      messagePlaceholder: string;
      toast: {
        success: {
          title: string;
          description: string;
        };
        error: {
          title: string;
          description: string;
        };
      };
      submit: string;
    };
  };
}

export default function PhoneLoginForm() {
  // const contactFormSchema = z.object({
  //   phone: z.string().refine((value) => phoneRegExp.test(value), {
  //     message: validation.phone.refine,
  //   }),
  // });

  const fieldObjs = [
    {
      name: 'firstName',
      // label: dic.labels[0],
      placeholder: 'Aaron',
    },
  ];

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="phone" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button className="w-full mt-2 text-white" type="submit">
        Login
      </Button>
      <Button variant="outline" className="w-full bg-secondary">
        <span className="mr-2">
          <Image
            src="/images/google-logo.png"
            alt="google-logo"
            height={25}
            width={25}
          />
        </span>
        Login with Google
      </Button>
    </div>
  );
}
