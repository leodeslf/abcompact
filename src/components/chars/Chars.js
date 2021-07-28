import { createContext, useState } from 'react';
import CharsBodies from './chars-bodies/CharsBodies';
import CharsTitles from './chars-titles/CharsTitles';

export const CharsTabContext = createContext();

export default function Chars() {
  const [charsTab, setCharsTab] = useState('d0');
  const updateCharsTab = i => setCharsTab(i);

  return (
    <div className="chars tabbed-menu" role="tablist">
      <CharsTabContext.Provider value={{ charsTab, updateCharsTab }}>
        <CharsTitles />
        <CharsBodies />
      </CharsTabContext.Provider>
    </div>
  );
}
