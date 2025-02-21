'use client'
import { useState } from "react";
import SpellLevel from "../components/SpellLevel";
export default function Home() {


  return (
    <div className="min-h-screen bg-background text-foreground">
      <h1 className="text-4xl text-center p-8">Spellbook</h1>
      <div className="flex flex-col items-center justify-center w-[50%] p-8">
          <SpellLevel level="One" />
          <SpellLevel level="Two" />
          <SpellLevel level="Three" />
      </div>
    </div>
  );
}