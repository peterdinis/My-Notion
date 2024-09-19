"use client";

import { useEffect, useState } from "react";
import CoverImageModel from "../../models/ConverImageModel";
import { SettingsModel } from "../../models/SettingsModel";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModel />
      <CoverImageModel />
    </>
  );
};