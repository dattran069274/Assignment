import styled from "styled-components";

export const ProfileView = styled.div`
  position: relative;
  margin-bottom: 15px;

  .ProfileImgWrap {
    height: 120px;
    width: 120px;

    img {
      border-radius: 50%;
      height: 120px;
      width: 120px;
    }
  }

  .ProfileImg {
    width: 120px;
    height: 120px;
  }

  .profile-basic {
    margin-left: 140px;
    padding-right: 50px;
  }

  .user-name {
    color: #333;
  }

  .staff-id {
    font-size: 14px;
    // font-weight: 500;
    margin-top: 5px;
  }

  .btn-custom {
    background: #00c5fb;
    background: linear-gradient(to right, #00c5fb 0%, #0253cc 100%);
    color: #fff;
    border: 0;
  }

  .btn-active {
    background-color: #c2eeba;
    padding: 5px 30px;
    color: #fff;
  }

  .personal-info {
    list-style: none;
    margin-bottom: 0;
    padding: 0;

    li {
      margin-bottom: 10px;
      margin-right: 10px;

      .title {
        color: #4f4f4f;
        float: left;
        font-weight: 500;
        margin-right: 30px;
        width: 25%;
      }

      .personal-info li .text {
        color: #8e8e8e;
        display: block;
        overflow: hidden;
      }

      .btn-in-active {
        background-color: #ffa9a9;
      }
    }
  }
`;

export const ButtonToggleSwitch = styled.label`
  display: inline-block;
  width: 50px;
  height: 20px;
  background-color: #999;
  border-radius: 30px;
  cursor: pointer;
  padding: 0;
`;
