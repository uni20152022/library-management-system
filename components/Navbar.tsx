import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AssignmentInd,
  Book,
  BookOnline,
  Favorite,
  Home,
  Logout,
  Menu,
} from "@mui/icons-material";

import { useUser } from "@hooks";
import { LOCAL_URL } from "@constants";

const listItemsAdmin = [
  {
    listIcon: <Home />,
    listText: "Home",
    listRoute: LOCAL_URL.admin.home,
  },
  {
    listIcon: <AssignmentInd />,
    listText: "Manage users",
    listRoute: LOCAL_URL.admin.users,
  },
  {
    listIcon: <Book />,
    listText: "Manage books",
    listRoute: LOCAL_URL.admin.books,
  },
  {
    listIcon: <Logout />,
    listText: "Logout",
    listRoute: LOCAL_URL.logout,
  },
];

const listItemsClient = [
  {
    listIcon: <Home />,
    listText: "Home",
    listRoute: LOCAL_URL.client.home,
  },
  {
    listIcon: <BookOnline />,
    listText: "My bookings",
    listRoute: LOCAL_URL.client.mybooks,
  },
  {
    listIcon: <Book />,
    listText: "Booking",
    listRoute: LOCAL_URL.client.books,
  },
  {
    listIcon: <Favorite />,
    listText: "Wishlist",
    listRoute: LOCAL_URL.client.wishlist,
  },
  {
    listIcon: <Logout />,
    listText: "Logout",
    listRoute: LOCAL_URL.logout,
  },
];

const NavbarFC: FunctionComponent<{ title: string }> = ({
  title,
}: {
  title: string;
}) => {
  const router = useRouter();
  const { userRole, user, loading } = useUser();
  const [listItems, setListItems] = useState(Array<any>());

  useEffect(() => {
    if (!(user || loading)) {
      router.push(LOCAL_URL.auth);
    } else {
      setListItems(userRole === "admin" ? listItemsAdmin : listItemsClient);
    }
  }, [user, loading, userRole]);

  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleSideMenu = useCallback(() => {
    setOpenSideMenu((prevState) => !prevState);
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleSideMenu}>
            <Menu />
          </IconButton>
          <Typography variant="h5">{title}</Typography>
          <Drawer open={openSideMenu} anchor="right" onClose={toggleSideMenu}>
            <Box
              component="div"
              sx={{
                width: 250,
                background: "#511",
                height: "100%",
              }}
            >
              <Avatar
                src="https://i.ibb.co/rx5DFbs/avatar.png"
                alt="Juaneme8"
                variant="rounded"
                sx={{
                  margin: "0.5rem auto",
                  padding: "1rem",
                  height: "auto",
                  width: "auto",
                }}
              />
              <Divider />
              <List>
                {listItems.map((listItem, index) => (
                  <ListItem
                    button
                    key={index}
                    sx={{
                      color: "tan",
                    }}
                    onClick={() => {
                      router.push(listItem.listRoute);
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "tan",
                      }}
                    >
                      {listItem.listIcon}
                    </ListItemIcon>
                    <ListItemText primary={listItem.listText} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export const Navbar = memo(
  NavbarFC,
  (prevProps, nextProps) => prevProps.title === nextProps.title
);
