"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

export default function ContactPref() {
  const [emailPref, setEmailPref] = useState(true);
  const [smsPref, setSmsPref] = useState(false);
  const [callPref, setCallPref] = useState(true);

  const getTrackClass = (checked: boolean) =>
    checked
      ? "bg-cyan-500 peer-checked:bg-cyan-500"
      : "bg-gray-300 peer-checked:bg-cyan-500";

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Contact Preferences</h2>

      <div className="flex items-center justify-between">
        <span>Live Order Notifications</span>
        <Switch
          checked={emailPref}
          onCheckedChange={setEmailPref}
          className={`${getTrackClass(emailPref)}`}
        />
      </div>

      <div className="flex items-center justify-between">
        <span>Promotional Notifications</span>
        <Switch
          checked={smsPref}
          onCheckedChange={setSmsPref}
          className={`${getTrackClass(smsPref)}`}
        />
      </div>

      <div className="flex items-center justify-between">
        <span>Promotional Emails</span>
        <Switch
          checked={callPref}
          onCheckedChange={setCallPref}
          className={`${getTrackClass(callPref)}`}
        />
      </div>
    </Card>
  );
}
