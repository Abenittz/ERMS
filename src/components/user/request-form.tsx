import { MessageSquare } from 'lucide-react';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function RequestForm() {
  return (
    <div>
      <Card className="w-[580px]">
        <CardHeader className="flex items-center gap-4">
          <div className="bg-accent flex h-10 w-10 items-center justify-center rounded-md">
            <MessageSquare />
          </div>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>Hello world! This is a simple card component.</div>
        </CardContent>
        <CardFooter className="flex justify-between">afsd</CardFooter>
      </Card>
    </div>
  );
}
