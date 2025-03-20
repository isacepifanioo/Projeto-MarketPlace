import { useEffect, useState } from "react"
import { StyledError } from "./Error.styled"

interface Props {
    message: string
    handleCurretMesagem: () => void
}
export const Error = ({message, handleCurretMesagem}: Props) => {
  const [progress, setProgress] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    if(progress >= 100) {
      handleCurretMesagem()
      console.log('ola');
      setProgress(0)
      setIsOpen(false)
      return
    }

    const interval = setInterval(() => {
      setProgress((prevent) => {
        const currentProgress =  prevent + 5
        if(currentProgress < 105) {
          setIsOpen(true)
          return currentProgress
        } else {
          return prevent
        }
        
      })
    }, 200)

    return () => {
      clearInterval(interval)
    }
  }, [progress, handleCurretMesagem])
  useEffect(() => {
    if(message) {
      setProgress(0)
      setIsOpen(true)
    }
  }, [message])

  return (
    <>
      {isOpen && (<StyledError>
        <p>{message}</p>
        <div className="conteineProgressError">
          <div className="currentProgress" style={{width: `${progress}%`}}></div>
        </div>
    </StyledError>)}
    </>
  )
}