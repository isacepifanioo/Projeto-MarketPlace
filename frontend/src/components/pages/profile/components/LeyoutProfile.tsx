import { useAxios } from "../../../../hook/useAxios";
import { UserRegister } from "../../../../interface/User";
import { StyledSpiner } from "../../../../spiner/Spine.styled";
import {
  StyledConteineProfile,
  StyledProfile,
  StyledProfileImg,
} from "./LeyoutProfile.styled";
import { FaRegEdit } from "react-icons/fa";

export const LeyoutProfile = () => {
  const { data, loading } = useAxios<UserRegister>({
    method: "get",
    url: `/users/${JSON.parse(localStorage.getItem("user") as string)}`,
  });
  return (
    <StyledProfile>
      {loading && <StyledSpiner />}
      {data && (
        <>
          <StyledConteineProfile>
            <StyledProfileImg $img={`http://localhost:3000/${data.img}`} />
            <div className="data">
              <h1>
                {data.name} {data.lastname}
              </h1>
              <p>
                <span>E-mail:</span> {data.email}
              </p>
            </div>
          </StyledConteineProfile>
          <div className="icon-edit">
            <FaRegEdit />
          </div>
        </>
      )}
    </StyledProfile>
  );
};
