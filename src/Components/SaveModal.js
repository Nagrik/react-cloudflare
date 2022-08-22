import React from "react";
import styled from "styled-components";
import CloseIcon from "../assets/Icons/CloseIcon";
import { Input } from "../utils/Input";
import { InputWrapper } from "../App";
import useInput from "../utils/useInput";
import axios from "axios";

const SaveModal = ({ value, location, toggleSended, setModal, id }) => {
  const [email, setEmail] = useInput(null);
  const text = `<table border="0" cellpadding="0" cellspacing="0" width="100%">
  <tbody>
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="max-width: 600px"
        >
          <tbody>
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 36px 24px 0;
                  font-family: Arial, sans-serif;
                  border-top: 3px solid #d4dadf;
                "
              >
                <h1
                  style="
                    margin: 0;
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: -1px;
                    line-height: 48px;
                  "
                >
                    You saved the form from Meshed Group
                </h1>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="max-width: 600px"
        >
          <tbody>
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                "
              >
                <p style="margin: 0">
                  To continue filling out the form, click on the button:
                </p>
              </td>
            </tr>
            <tr>
              <td align="left" bgcolor="#ffffff">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        bgcolor="#ffffff"
                        style="padding: 12px"
                      >
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td
                                align="center"
                                bgcolor="#1a82e2"
                                style="border-radius: 6px"
                              >
                                <a
                                  href="https://react-cloudflare-4yy.pages.dev/${id || location}"
                                  target="_blank"
                                  style="
                                    display: inline-block;
                                    padding: 16px 36px;
                                    font-family: Arial, sans-serif;
                                    font-size: 16px;
                                    color: #ffffff;
                                    text-decoration: none;
                                    border-radius: 6px;
                                  "
                                  >Open form</a
                                >
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                "
              >
                <p style="margin: 0">
                  If that doesn't work, copy and paste the following link in
                  your browser:
                </p>
                <p style="margin: 0">
                  <a
                    href="https://react-cloudflare-4yy.pages.dev/${id || location}"
                    target="_blank"
                    >https://react-cloudflare-4yy.pages.dev/${id || location}</a
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                  border-bottom: 3px solid #d4dadf;
                "
              >
                <p style="margin: 0">Cheers,<br />Text</p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="max-width: 600px"
        >
          <tbody>
            <tr>
              <td
                align="center"
                bgcolor="#e9ecef"
                style="
                  padding: 12px 24px;
                  font-family: Arial, sans-serif;
                  font-size: 14px;
                  line-height: 20px;
                  color: #666;
                "
              >
                <p style="margin: 0">
                  You received this message because there was a request to save
                  and send the form to your email. If you didn't request the form,
                  you could safely delete this message.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
  const handleClickButton = () => {
    axios.post(
      "https://api.elasticemail.com/v4/emails",
      {
        Recipients: [
          {
            Email: email,
          },
        ],
        Content: {
          Subject: "Your form has been saved.",
          Body: [
            {
              ContentType: "HTML",
              Content: text,
              Charset: "utf-8",
            },
          ],
          "From": "Juan Visser <hello@myrobovault.com>"
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-ElasticEmail-ApiKey":
            "40F7FE6C0FA442CAD2BF94B926F2AEB4DB74335D4EF4EBA3FC1BF4C7C7A723232C3436FC086E96778570B23D7626119D",
        },
      }
    );
    setModal(false);
    toggleSended(true);
  };

  return (
    <div>
      <CloseIconWrapper onClick={() => setModal(false)}>
        <CloseIcon />
      </CloseIconWrapper>
      <Title>Your progress has been saved</Title>
      <Subtitle>
        Copy or email the link below and return to your form to complete your
        submission.
      </Subtitle>
      <SubtitleCopy>Copy your form link:</SubtitleCopy>
      <InputWrapper>
        <Input value={value} />
      </InputWrapper>
      <SubtitleEmail>Email me my link:</SubtitleEmail>
      <InputWithButton>
        <InputWrapper>
          <Input onChange={setEmail} />
        </InputWrapper>
        <Button disabled={!email} email={email} onClick={handleClickButton}>
          Send
        </Button>
      </InputWithButton>
    </div>
  );
};

export default SaveModal;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.email !== null ? "#000" : "#cccc")};
  padding: 7px;
  font-size: 12px;
  font-family: "Verdana", sans-serif;
  cursor: pointer;
  background-color: #eeeeee;
  width: 63px;
  height: 35px;
  margin-left: 10px;
  outline: none;
  border: none;
`;

const InputWithButton = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  color: #54565a;
  font-size: 16px;
  font-family: "Verdana", sans-serif;
  font-weight: 600;
  margin-top: 20px;
  padding: 15px 0;
`;

const Subtitle = styled.div`
  font-family: "Verdana", sans-serif;
  font-size: 12px;
  padding-right: 45px;
`;

const SubtitleCopy = styled.div`
  font-family: "Verdana", sans-serif;
  font-size: 12px;
  padding-right: 45px;
  padding-top: 50px;
`;

const SubtitleEmail = styled.div`
  font-family: "Verdana", sans-serif;
  font-size: 12px;
  padding-right: 45px;
  padding-top: 20px;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
`;
