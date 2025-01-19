import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberallow, setnumberallow] = useState(false);
  const [charallow, setcharallow] = useState(false);
  const [pass, setPass] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let passw = "";
    let string = "ABCDEFGGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallow) string += "0123456789";
    if (charallow) string += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length);
      passw += string.charAt(char);
    }
    setPass(passw);
  }, [length, numberallow, charallow]);

  const copyPassClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charallow, numberallow, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto my-20 bg-gradient-to-r from-blue-500 to-teal-500 p-8 rounded-lg shadow-lg text-white">
        <h1 className="text-2xl font-semibold mb-6 text-center">Password Generator</h1>

        <div className="flex shadow rounded-lg mb-4 overflow-hidden bg-white">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-2 px-4 text-gray-800 bg-gray-100"
            placeholder="Your password will appear here"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-all"
            onClick={copyPassClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-4 mb-6">
          <div className="flex items-center gap-x-2">
            <label>Length:</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-full"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <span>{length}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberallow}
              id="numberInput"
              onChange={() => setnumberallow((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charallow}
              id="charInput"
              onChange={() => setcharallow((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
