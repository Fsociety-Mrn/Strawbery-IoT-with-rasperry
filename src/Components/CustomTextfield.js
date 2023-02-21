import { TextField } from '@mui/material';

import { styled } from "@mui/material/styles";


const primaryColour = '#F68A7D'; //Green
// const lightColour = '#6DA043';  //Light Green
// const secondaryColour = '#FFFFFF';
const lastColour = '#000000';

export const LoginTextbox = styled(TextField)({
    "& label.Mui-focused": {
      color: primaryColour
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: primaryColour
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: lastColour
      },
      "&:hover fieldset": {
        borderColor: lastColour
      },
      "&.Mui-focused fieldset": {
        borderColor: primaryColour
      }
    }
  });