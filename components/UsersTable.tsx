import { FunctionComponent, memo, useCallback, useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { UserFormModal } from "@components";
import { UserModel } from "@models";

const UsersTableFC: FunctionComponent<{
  users: Array<UserModel>;
  actions?: Array<any>;
}> = ({
  users,
  actions,
}: {
  users: Array<UserModel>;
  actions?: Array<any>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openRow, setOpenRow] = useState(null);

  const handleRowClick = useCallback((row: any) => {
    setIsModalOpen(true);
    setOpenRow(row.id);
  }, []);

  const clearOpenRow = useCallback(() => {
    setIsModalOpen.call({}, false);
    setOpenRow(null);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>login</TableCell>
            <TableCell>created_date</TableCell>
            <TableCell>updated_date</TableCell>
            {actions &&
              actions.map((action, index) => (
                <TableCell key={index}>{action.name}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any, index: number) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => handleRowClick(user)}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell>{user.login}</TableCell>
              <TableCell>{user.created_date}</TableCell>
              <TableCell>{user.updated_date}</TableCell>
              {actions &&
                actions.map((action, index) => (
                  <TableCell key={index}>{action.value(user)}</TableCell>
                ))}
              <UserFormModal
                user={user}
                onClose={clearOpenRow}
                isOpen={isModalOpen && user.id === openRow}
                isNew={false}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const UsersTable = memo(
  UsersTableFC,
  (prevProps, nextProps) =>
    prevProps.users.length === nextProps.users.length &&
    prevProps.users.every(
      (prevUser, index) =>
        !!prevUser &&
        !!nextProps.users[index] &&
        JSON.stringify(prevUser) === JSON.stringify(nextProps.users[index])
    )
);
