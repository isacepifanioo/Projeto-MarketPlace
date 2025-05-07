import { useEffect, useState } from "react";
import {
  StyledConteineImg,
  StyledConteineInfor,
  StyledImg,
} from "./InforProducts.styled";

import { IoArrowBackCircleSharp, IoArrowForwardCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

interface Props {
  img: Blob[];
  name: string;
  price: string;
  description: string;
  handleDeleteImg: (position: number) => void
}

export const InforProducts = ({ img, name, price, description, handleDeleteImg }: Props) => {
  const [position, setPosition] = useState(0);
  const [file, setFile] = useState<string | undefined>(undefined);

  function handleIrrowForward() {
    if (!(img.length === position + 1)) {
      setPosition((prevent) => prevent + 1);
    }
  }

  function handleIrrowBack() {
    if (position > 0) {
      setPosition((prevent) => prevent - 1);
    }
  }

  useEffect(() => {
    if (img.length > 0 && img[position] instanceof Blob) {
      const fileUrl = URL.createObjectURL(img[position]);
      setFile(fileUrl);
    } 
    else if(img.length > 0 && typeof img[position] === 'string') {
      const urlImg = `http://localhost:3000/${img[position]}`
      setFile(urlImg)
    }
    else {
      setFile(undefined);
    }
  }, [position, img]);



  return (
    <StyledConteineInfor>
      <StyledConteineImg>
        <MdDelete
          className={`${img.length > 0 ? "" : "hidden"} mdDelete`} onClick={() => {
            handleDeleteImg(position)
            handleIrrowBack()
          }}
        />
        <IoArrowBackCircleSharp
          className={`${position > 0 ? "" : "hidden"} ArrowBack`}
          onClick={handleIrrowBack}
        />
        <StyledImg $img={file ? file : undefined} />
        <IoArrowForwardCircle
          className={`${img.length > 1 ? "done" : "hidden"} ${
            img.length === position + 1 ? "hidden" : ""
          } ArrowForward`}
          onClick={handleIrrowForward}
        />
      </StyledConteineImg>
      <div className="inforProducts">
        <h1>{name ? name : "Nome Do Produtos"}</h1>
        <h2>R$ {price ? price : '0.00'}</h2>
        <div className="conteineDescription">
          <p>{description ? description : "Descrição..."}</p>
        </div>
      </div>
    </StyledConteineInfor>
  );
};
