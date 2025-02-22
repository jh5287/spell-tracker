'use client'
import { useState } from "react";



interface SpellLevelProps {
    level: string;
    disableRemove: boolean;
  }

const SpellLevel: React.FC<SpellLevelProps> = ({level, disableRemove}) => {
    const [lvl, setLvl] = useState<number[]>([1]);
    const addNewSlot = () => {
        if (lvl.length != 4 && !disableRemove){
            setLvl([...lvl, Date.now()]);
        }
      };
      const removeSlot = (index: number) => {
        if (lvl.length != 1 && !disableRemove){
        setLvl(lvl.filter((slot) => slot !== index));
        }
      };
    return (
        <div className="flex flex-col items-center">
        <h1 className="text-2xl text-black">Level {level}</h1>
        <div className="flex flex-row  justify-center m-4">
            
            <button onClick={() => addNewSlot()} className={disableRemove? "hidden": "btn btn-primary m-3"}>
                Add new slot
                  </button>
                  <div className="flex flex-col items-center">
                  {lvl.map((slot) => (
            <div key={slot} className="m-0 p-4 rounded-lg shadow-md border-black border-2 flex flex-row items-center">
              <input type="checkbox" className="checkbox m-1 checkbox-primary" />
              <input type="text" className="input input-bordered input-primary m-1 text-white" placeholder="Spell..." />
              <div className={disableRemove ? "hidden w-6" : ""}>
                  <button onClick={() => removeSlot(slot)} className="btn btn-circle btn-sm btn-error">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12" />
                        </svg>
                  </button>
              </div>
            </div>
                  ))}
                  </div>
        </div>
        </div>
    )}

export default SpellLevel;