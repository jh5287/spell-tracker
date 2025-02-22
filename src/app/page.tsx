'use client'
import { useState } from "react";
import SpellLevel from "../components/SpellLevel";
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
export default function Home() {

  const [disableRemove, setDisableRemove] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <label className="btn btn-circle swap swap-rotate m-5">
      {/* this hidden checkbox controls the state */}
     <input type="checkbox" onChange={() => setDisableRemove(!disableRemove)}/>
      {/* hamburger icon */}
      <Icon path={mdiCheck} size={1} className="swap-off fill-current ml-1" />
      {/* close icon */}
      <svg
    className="swap-on fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512">
    <polygon
      points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
      </svg>
      </label>
      <div className="grid grid-cols-2 gap-8 p-8 ">
          <SpellLevel level="One" disableRemove={disableRemove}/>
          <SpellLevel level="Two" disableRemove={disableRemove}/>
          <SpellLevel level="Three" disableRemove={disableRemove}/>
      </div>
    </div>
  );
}