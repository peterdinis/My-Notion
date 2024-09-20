"use client";

import { useToast } from "@/hooks/use-toast";
import { useCallback, useState } from "react";

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);
	const { toast } = useToast();
	const copy: CopyFn = useCallback(
		async (text) => {
			if (!navigator?.clipboard) {
				console.warn("Clipboard not supported");
				return false;
			}

			try {
				await navigator.clipboard.writeText(text);
				setCopiedText(text);
				toast({
					title: "Skopirovaná hodnota",
					duration: 2000,
					className: "bg-green-500 text-blue-50",
				});
				return true;
			} catch {
				toast({
					title: "Hodnotu sa nepodarilo skopírovať",
					duration: 2000,
					className: "bg-red-500 text-blue-50",
				});

				setCopiedText(null);
				return false;
			}
		},
		[toast],
	);

	return [copiedText, copy];
}