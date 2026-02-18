"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker, DayPickerProps } from "react-day-picker";
import "react-day-picker/dist/style.css";
import dayjs from "dayjs";

interface DatePickerProps extends Omit<DayPickerProps, "mode" | "selected" | "onSelect"> {
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
}

export default function DatePicker({
    value,
    onChange,
    placeholder = "Select date",
    ...dayPickerProps
}: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full h-12 border rounded-2xl px-4 text-left bg-background hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium cursor-pointer"
            >
                {value ? dayjs(value).format("MMM DD, YYYY") : (
                    <span className="text-muted-foreground">{placeholder}</span>
                )}
            </button>

            {open && (
                <div className="absolute mt-3 z-50 bg-background border rounded-2xl shadow-xl p-4 animate-in fade-in zoom-in-95 duration-150">
                    <DayPicker
                        mode="single"
                        selected={value}
                        onSelect={(selected) => {
                            onChange(selected);
                            setOpen(false);
                        }}
                        className="rdp-custom"
                        classNames={{
                            day_selected: "bg-primary text-primary-foreground rounded-xl",
                            day_today: "border border-primary",
                            day: "hover:bg-primary/10 rounded-xl transition",
                        }}
                        {...dayPickerProps}
                    />
                </div>
            )}
        </div>
    );
}
