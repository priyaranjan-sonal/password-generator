import React, { useState, useCallback, useRef } from 'react'
import { RotateCw } from 'lucide-react'

const App = () => {
  const defaultColor = '#9ee4bf'
  const [color, setColor] = useState(defaultColor)


  let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let nums = '0123456789'
  let sym = '!@#$%^&*()_+'

  const passwordRef = useRef(null)

  const [length, setLength] = useState(8)
  const [alphabetsAllowed, setAlphabetsAllowed] = useState(false)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [symbolsAllowed, setSymbolsAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const [isCopied, setIsCopied] = useState(false)


  const generatePassword = useCallback(() => {
    let finalPass = ''
    let str = ''
    let rand
    if (alphabetsAllowed || numbersAllowed || symbolsAllowed) {
      if (alphabetsAllowed) str += alpha
      if (numbersAllowed) str += nums
      if (symbolsAllowed) str += sym

      for (let i = 0; i < length; i++) {
        rand = Math.floor(Math.random() * str.length)
        finalPass += str.charAt(rand)
      }

      setPassword(finalPass)
    } else {
      alert("Choose atleast one option from Alphabets, Numbers, or Symbols!")
    }
  }, [length, alphabetsAllowed, numbersAllowed, symbolsAllowed])



  const copyPassword = async () => {
    try {
      if (password) {
        await navigator.clipboard.writeText(password)
        passwordRef.current?.select()
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } else {
        alert("First generate a password to copy!")
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <>

      <div
        className="min-h-dvh w-full transition-[background-color] duration-500 ease-out flex flex-col px-4 py-8 sm:py-10 overflow-x-hidden relative"
        style={{ backgroundColor: color }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.30]"
          style={{
            background:
              'radial-gradient(ellipse 85% 55% at 50% -15%, rgb(255 255 255 / 0.52), transparent 55%), radial-gradient(ellipse 70% 45% at 110% 105%, rgb(255 255 255 / 0.28), transparent 50%), radial-gradient(ellipse 50% 35% at -5% 80%, rgb(255 255 255 / 0.14), transparent 45%)',
          }}
          aria-hidden
        />

        <div className="relative z-1 w-full max-w-xl mx-auto flex flex-col gap-6 sm:gap-8 flex-1 justify-center min-h-0">
          <div className='w-full rounded-2xl border border-slate-500/60 bg-white/90 px-5 py-6 sm:px-8 sm:py-8 shadow-[0_12px_48px_-16px_rgba(15,23,42,0.12),0_0_0_1px_rgb(255_255_255/0.85)_inset] backdrop-blur-lg ring-1 ring-slate-100'>
            <h1 className='text-slate-800 text-center text-2xl sm:text-[1.65rem] font-semibold tracking-tight mb-1'>
              Password Generator
            </h1>
            <p className='text-center text-slate-500 text-sm mb-6'>Choose options, then generate a random password.</p>
            <div className='flex flex-col sm:flex-row rounded-xl overflow-hidden border border-slate-300/90 shadow-sm m-0 mb-5'>
              <input
                type="text"
                value={password}
                className='bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none w-full min-w-0 px-4 py-3.5 text-[0.95rem] font-mono border-b border-slate-200/90 sm:border-b-0 sm:border-r-0'
                placeholder='Password...'
                readOnly
                ref={passwordRef}
              />
              <button
                onClick={copyPassword}
                type="button"
                className='w-full min-w-24 sm:w-auto hover:cursor-pointer outline-none bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 sm:py-3 shrink-0 text-md font-semibold tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white'
              >{isCopied ? 'copied!' : 'copy'}
              </button>
            </div>

            <div className='flex flex-col gap-4 sm:gap-5 px-0 py-1'>
              <div className='flex gap-3 items-center w-full min-w-0'>
                <input
                  type="range"
                  name=""
                  id="pw-length"
                  min={6}
                  max={50}
                  className='cursor-pointer self-center flex-1 min-w-30 accent-indigo-600'
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
                <label htmlFor="pw-length" className='text-slate-700 text-sm font-medium whitespace-nowrap tabular-nums'>Length: {length}</label>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3'>
                <div className='flex gap-2 items-center w-full min-w-0'>
                  <input
                    type="checkbox"
                    name=""
                    id="pw-alpha"
                    className='cursor-pointer self-center size-4 rounded border-slate-400 text-indigo-600 focus:ring-indigo-500'
                    defaultChecked={alphabetsAllowed}
                    onChange={() => {
                      setAlphabetsAllowed((prev) => !prev)
                    }}
                  />
                  <label htmlFor="pw-alpha" className='text-slate-700 text-sm font-medium whitespace-nowrap'>Alphabets</label>
                </div>

                <div className='flex gap-2 items-center w-full min-w-0'>
                  <input
                    type="checkbox"
                    name=""
                    id="pw-num"
                    className='cursor-pointer self-center size-4 rounded border-slate-400 text-indigo-600 focus:ring-indigo-500'
                    defaultChecked={numbersAllowed}
                    onChange={() => {
                      setNumbersAllowed((prev) => !prev)
                    }}
                  />
                  <label htmlFor="pw-num" className='text-slate-700 text-sm font-medium whitespace-nowrap'>Numbers</label>
                </div>

                <div className='flex gap-2 items-center w-full min-w-0'>
                  <input
                    type="checkbox"
                    name=""
                    id="pw-sym"
                    className='cursor-pointer self-center size-4 rounded border-slate-400 text-indigo-600 focus:ring-indigo-500'
                    defaultChecked={symbolsAllowed}
                    onChange={() => {
                      setSymbolsAllowed((prev) => !prev)
                    }}
                  />
                  <label htmlFor="pw-sym" className='text-slate-700 text-sm font-medium whitespace-nowrap'>Symbols</label>
                </div>
              </div>
            </div>

            <button
              type="button"
              className='w-full bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer text-white font-semibold py-3 px-4 mt-6 rounded-xl shadow-md shadow-indigo-500/15 border border-indigo-600/25 block mx-auto active:scale-[0.98] transition-all duration-150 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
              onClick={generatePassword}
            >
              Generate Password
            </button>
          </div>

          <div
            className='w-full rounded-2xl bg-white/95 px-4 py-4 sm:px-5 sm:py-4 lg:px-8 lg:py-6 border-2 border-slate-400/95 shadow-[0_10px_36px_-10px_rgba(15,23,42,0.18)] backdrop-blur-md'
            role="group"
            aria-label="Background colour"
          >
            <p className='text-slate-600 text-xs font-semibold uppercase tracking-wide mb-3 text-center sm:text-left'>Theme</p>
            <div className='flex flex-col min-[480px]:flex-row flex-wrap gap-3 min-[480px]:items-center min-[480px]:justify-center'>

              <button
                type="button"
                onClick={() => setColor('#fb9ebf')}
                className='w-full min-[480px]:w-auto min-[480px]:min-w-26 flex-1 bg-rose-200 hover:bg-rose-300 text-rose-950 font-semibold text-sm py-3 px-4 rounded-xl border-2 border-rose-400/90 shadow-sm active:scale-[0.98] transition-all'
              >Redish</button>

              <button
                type="button"
                onClick={() => setColor('#93d6fa')}
                className='w-full min-[480px]:w-auto min-[480px]:min-w-26 flex-1 bg-sky-200 hover:bg-sky-300 text-sky-950 font-semibold text-sm py-3 px-4 rounded-xl border-2 border-sky-500/70 shadow-sm active:scale-[0.98] transition-all'
              >Blueish</button>

              <button
                type="button"
                onClick={() => setColor('#f7d08a')}
                className='w-full min-[480px]:w-auto min-[480px]:min-w-26 flex-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-semibold text-sm py-3 px-4 rounded-xl border-2 border-yellow-700/55 shadow-sm active:scale-[0.98] transition-all'
              >Slate</button>

              <button
                type="button"
                onClick={() => setColor('#b8c4fc')}
                className='w-full min-[480px]:w-auto min-[480px]:min-w-26 flex-1 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 font-semibold text-sm py-3 px-4 rounded-xl border-2 border-indigo-600/60 shadow-sm active:scale-[0.98] transition-all'
              >Navy</button>

              <RotateCw
                role="button"
                tabIndex={0}
                aria-label="Reset theme"
                onClick={() => setColor(defaultColor)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setColor(defaultColor)
                  }
                }}
                className="sm: w-full cursor-pointer shrink-0 bg-green-200 hover:bg-green-300 px-2 py-3 my-1 text-green-950 rounded-xl border-2 border-green-500/70 shadow-sm active:scale-95 self-center min-[480px]:self-auto transition-all focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white outline-none"
                size={48}
              />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default App