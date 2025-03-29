'use client'
import { useState, useEffect } from "react";
import SpellLevel from "../components/SpellLevel";
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';


interface Levels {
  lvl1: Record<number, number>;
  lvl2: Record<number, number>;
  lvl3: Record<number, number>;
  lvl4: Record<number, number>;
  lvl5: Record<number, number>;
}

interface ClassData {
  _id: string;
  name: string;
  spellCaster: boolean;
  levels: Levels[];
}

interface Spell {
  _id: string; // Assuming you'll convert ObjectId to a string
  name: string;
  level: number;
  school: string;
  casting_time: string;
  range: string;
  components: string[];
  material?: string; // Optional, since some spells may not have materials
  duration: string;
  classes: string[];
  damage_type: string;
  description: string;
  higher_levels?: string; // Optional, since some spells may not have scaling effects
}

export default function Home() {

  useEffect(() => {
    async function fetchSpells() {
      try {
        const res = await fetch("/api/spells");
        const data = await res.json();
        setSpells(data);
      } catch (error) {
        console.error("Error fetching spells:", error);
      } finally {
        setLoading(false);
      }
    }
    async function fetchClasses() {
      try {
        const res = await fetch("/api/class");
        const data = await res.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchClasses();
    fetchSpells();
  }, []);
  const [spells, setSpells] = useState<Spell[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassData>({
    _id: "",
    name: "",
    spellCaster: false,
    levels: [],
  });
  const [selectedLevel, setSelectedLevel] = useState<Record<number, number> | null>(null);
  const [loading, setLoading] = useState(true);

  const [disableRemove, setDisableRemove] = useState<boolean>(true);
  const [spellLvl, setSpellLvl] = useState<string[]>(["One", "Two", "Three"]);
  const addSpellLvl = () => {
    if (spellLvl.length != 9){
      setSpellLvl([...spellLvl, `${spellLvl.length + 1}`]);
    }
  };  
  const removeSpellLvl = () => {
    if (spellLvl.length != 3){
      setSpellLvl(spellLvl.filter((lvl) => lvl !== `${spellLvl.length}`));
    }
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const foundClass = classes.find(cls => cls.name === e.target.value);
    if (foundClass) {
      console.log("foundClass", foundClass);
      setSelectedClass(foundClass);
    }
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const levelKey = e.target.value as keyof Levels; // Explicitly cast to keyof Levels
    
    if (selectedClass?.levels && levelKey in selectedClass.levels) {
      console.log("Level Key:", levelKey);
      console.log("Selected thingy:", selectedClass.levels[levelKey]);
      setSelectedLevel(selectedClass.levels[levelKey]); 
    } else {
      setSelectedLevel(null);
    }
  };

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
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-black">Spell Tracker</h1>
        <select // This select will allow the user to choose a class
          value={selectedClass.name}
          onChange={(e) => handleClassChange(e)}
          className="select select-bordered select-primary w-full max-w-xs m-5 text-white">
          <option value="">Select a Class</option>
          {classes.map((cls) => (
            cls.spellCaster === true &&(
              
            <option key={cls._id} value={cls.name}>
              {cls.name}
            </option>
            )
          ))}
        </select>
        </div>
        <div className="flex flex-col items-center">
        <select
  disabled={!selectedClass.spellCaster}
  onChange={handleLevelChange}
  className="select select-bordered select-primary w-full max-w-xs m-5 text-white">
  <option value="">Select a Level</option>
  {selectedClass?.levels &&
    Object.entries(selectedClass.levels).map(([levelKey]) => (
      <option key={levelKey} value={levelKey}>
        {levelKey}
      </option>
    ))}
</select>
        </div>

      <div className="grid grid-cols-2 gap-8 p-8 ">
          {spellLvl.map((lvl) => (
            <SpellLevel key={lvl} level={lvl} disableRemove={disableRemove}/>
          ))}
          <button onClick={() => addSpellLvl()} className={disableRemove ? "hidden w-6" : "btn btn-primary m-3"}>
            Add new level
          </button>
          <button onClick={() => removeSpellLvl()} className={disableRemove ? "hidden w-6" : "btn btn-error m-3"}>
            Remove last level
          </button>
          <ul>
        {spells.map((spell, index) => (
          <li key={index}>
            <strong>{spell.name}</strong> - Level {spell.level} ({spell.school})
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}