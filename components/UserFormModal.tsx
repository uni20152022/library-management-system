import { FunctionComponent, memo, useCallback, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Input,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";

import { UserModel } from "@models";

const formControlLabels: Array<keyof UserModel> = [
  "login",
  "created_date",
  "updated_date",
];

interface UserFormModal {
  user: UserModel;
  onClose: () => void;
  isOpen: boolean;
  isNew: boolean;
}

const UserFormModalFC: FunctionComponent<UserFormModal> = ({
  user,
  onClose,
  isOpen,
  isNew,
}: UserFormModal) => {
  const [formInfo, setFormInfo] = useState(
    isNew
      ? ({
          id: "",
          login: "",
          password: "",
          token: "",
          created_date: "",
          updated_date: "",
        } as UserModel)
      : {
          ...user,
        }
  );

  const handleChange = useCallback(
    (controlLabel: keyof UserModel, controlValue: string) => {
      setFormInfo((prevState) => ({
        ...prevState,
        [controlLabel]: controlValue,
      }));
    },
    []
  );

  const handleSubmit = useCallback(() => {
    // TODO update or add this user
    onClose();
  }, [onClose]);

  const handleDelete = useCallback(() => {
    // TODO delete this user
    onClose();
  }, [onClose]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="user-form-modal-title"
      aria-describedby="user-form-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <FormGroup>
          <FormLabel sx={{ mb: 2, textAlign: "center" }}>
            <Typography variant="h4">
              {(isNew ? "Add" : "Update") + " user"}
            </Typography>
          </FormLabel>
          {formControlLabels.map((controlLabel, index) => (
            <FormControl sx={{ mb: 2, mt: 2 }} key={index}>
              <InputLabel htmlFor={`${controlLabel}-input`}>
                {controlLabel}
              </InputLabel>
              <Input
                id={`${controlLabel}-input`}
                value={formInfo[controlLabel]}
                onChange={(e) => handleChange(controlLabel, e.target.value)}
              />
            </FormControl>
          ))}
          <Button
            type="submit"
            color="primary"
            size="medium"
            variant="contained"
            disableRipple
            disableElevation
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {isNew ? "Add" : "Update"}
          </Button>
          {!isNew && (
            <Button
              type="submit"
              color="error"
              size="medium"
              variant="contained"
              disableRipple
              disableElevation
              sx={{ mt: 1 }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </FormGroup>
      </Box>
    </Modal>
  );
};

export const UserFormModal = memo(
  UserFormModalFC,
  (prevProps, nextProps) =>
    prevProps.user.id === nextProps.user.id &&
    prevProps.onClose === nextProps.onClose &&
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.isNew === nextProps.isNew
);
