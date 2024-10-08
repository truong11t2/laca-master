import {
  Button,
  Box,
  Container,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Stack,
  useColorMode,
  useColorModeValue as mode,
  MenuItem,
  Menu,
  MenuList,
  MenuButton,
  // ButtonGroup,
  Spacer,
  useToast,
  Image,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { GiWorld } from "react-icons/gi";
// import { FaTwitter, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAdminPanelSettings } from "react-icons/md";

import { logout } from "../redux/actions/userActions";

const Navbar = () => {
  const authLinks = [
    { linkName: "Đăng nhập", path: "/login" },
    { linkName: "Đăng ký", path: "/register" },
  ];

  const links = [
    { linkName: "GIỚI THIỆU", path: "/about" },
    { linkName: "LIÊN HỆ", path: "/contact" },
  ];

  const homeLink = {linkName: "BÀI VIẾT", path: "/blog/latest"}

  const blogLinks = [
    //Todo: route to most viewed posts
    // { linkName: "Most Viewed", category: "all" },
    { linkName: "Tất Cả", category: "all" },
    { linkName: "Mới Nhất", category: "latest" },
  ];

  const europeLinks = [
    { linkName: "Pháp", category: "europe", country: "france" },
    { linkName: "Đức", category: "europe", country: "germany" },
  ];

  const asiaLinks = [
    { linkName: "Nhật Bản", category: "asia", country: "japan" },
    { linkName: "Hàn Quốc", category: "asia", country: "korea" },
  ];

  const americaLinks = [
    { linkName: "Mỹ", category: "america", country: "usa" },
    { linkName: "Canada", category: "america", country: "canada" },
  ];
  const oceaniaLinks = [
    { linkName: "Úc", category: "oceania", country: "australia" },
    { linkName: "New Zealand", category: "oceania", country: "new-zealand" },
  ];
  const africaLinks = [
    { linkName: "Ai Cập", category: "africa", country: "ecrypt" },
    { linkName: "Nam Phi", category: "africa", country: "south-africa" },
  ];

  const NavLink = ({ path, children }) => (
    <Link
      as={ReactLink}
      to={path}
      px="2"
      py="2"
      fontWeight="semibold"
      _hover={{ textDecoration: "none", bg: mode("blue.100", "blue.800") }}
      onClick={storeCurrentUrl}
    >
      {children}
    </Link>
  );

  const NavAuthLink = ({ path, children }) => (
    <Link
      as={ReactLink}
      to={path}
      px="2"
      py="2"
      color={'blue.400'}
      //color={mode("blue.900", "greenyellow")}
      _hover={{ textDecoration: "none", bg: mode("blue.100", "blue.800") }}
      onClick={storeCurrentUrl}
    >
      {children}
    </Link>
  );
  const storeCurrentUrl = () => {
    const previousPageUrl = window.location.href;
    console.log(previousPageUrl);
    localStorage.setItem("previousPage", JSON.stringify(previousPageUrl));
    onIconClose();
  }
  // Desktop Menu
  const { isOpen: isIconOpen, onClose: onIconClose, onOpen: onIconOpen } = useDisclosure();
  const { isOpen: isMenuOpen, onClose: onMenuClose, onOpen: onMenuOpen } = useDisclosure();
  const { isOpen: isMenuEuropeOpen, onClose: onMenuEuropeClose, onOpen: onMenuEuropeOpen } = useDisclosure();
  const { isOpen: isMenuAsiaOpen, onClose: onMenuAsiaClose, onOpen: onMenuAsiaOpen } = useDisclosure();
  const { isOpen: isMenuAmericaOpen, onClose: onMenuAmericaClose, onOpen: onMenuAmericaOpen } = useDisclosure();
  const { isOpen: isMenuOceaniaOpen, onClose: onMenuOceaniaClose, onOpen: onMenuOceaniaOpen } = useDisclosure();
  const { isOpen: isMenuAfricaOpen, onClose: onMenuAfricaClose, onOpen: onMenuAfricaOpen } = useDisclosure();

  const menuRef = useRef(null);

  // Mobile Menu
  const { isOpen: isMenuOpenMobile, onClose: onMenuCloseMobile, onOpen: onMenuOpenMobile } = useDisclosure();
  const {
    isOpen: isMenuEuropeOpenMobile,
    onClose: onMenuEuropeCloseMobile,
    onOpen: onMenuEuropeOpenMobile,
  } = useDisclosure();
  const {
    isOpen: isMenuAsiaOpenMobile,
    onClose: onMenuAsiaCloseMobile,
    onOpen: onMenuAsiaOpenMobile,
  } = useDisclosure();
  const {
    isOpen: isMenuAmericaOpenMobile,
    onClose: onMenuAmericaCloseMobile,
    onOpen: onMenuAmericaOpenMobile,
  } = useDisclosure();
  const {
    isOpen: isMenuOceaniaOpenMobile,
    onClose: onMenuOceaniaCloseMobile,
    onOpen: onMenuOceaniaOpenMobile,
  } = useDisclosure();
  const {
    isOpen: isMenuAfricaOpenMobile,
    onClose: onMenuAfricaCloseMobile,
    onOpen: onMenuAfricaOpenMobile,
  } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  const [logoHover, setLogoHover] = useState(false);

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const isOceaniaMenu = false;
  const isAfricaMenu = false;

  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: "Bạn đã đăng xuất.", status: "success", isClosable: true });
  };

  // Function to handle clicks outside the menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      onIconClose();
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <Box bg={mode("blue.200", "blue.900")} zIndex={["sticky","sticky"]} px={0} position={["fixed", "fixed"]} w="100%" top={0}>
      <Container as="header" maxW="6xl" px={0}>
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <IconButton
            bg={mode("blue.200", "blue.900")}
            icon={isIconOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ md: "none" }}
            onClick={isIconOpen ? onIconClose : onIconOpen}
          />

          <HStack>
            <Link
              as={ReactLink}
              to="/"
              style={{ textDecoration: "none" }}
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
            >
              <Flex alignItems="center">
                {/* <Icon as={GiWorld} h="10" w="10" color={logoHover ? "gray.200" : mode("gray.600", "gray.400")} />
                <Text px="5" fontSize="2xl" fontWeight="extrabold" color={mode("gray.600", "gray.100")}>
                  La Cà
                </Text> */}
                <Image src="../../images/logo-1.png" boxSize='70px' objectFit='cover'></Image>
              </Flex>
            </Link>
            <HStack display={{ base: "none", md: "flex" }} pl="10">
{/*               <Menu isOpen={isMenuOpen}>
                <MenuButton
                  onMouseEnter={onMenuOpen}
                  onMouseLeave={onMenuClose}
                  onClick={isMenuOpen ? onMenuClose : onMenuOpen}
                  fontWeight="semibold"
                  p="2"
                  _hover={{ bg: mode("blue.100", "blue.800") }}
                >
                  Blog {isMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </MenuButton>
                <MenuList
                  onMouseEnter={onMenuOpen}
                  onMouseLeave={onMenuClose}
                  onClick={isMenuOpen ? onMenuClose : onMenuOpen}
                >
                  {blogLinks.map((link) => (
                    <MenuItem key={link.linkName} as={ReactLink} to={`/blog/${link.category}`}>
                      {link.linkName}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu> */}

              {/* Home page link */}
              <NavLink key={homeLink.linkName} path={homeLink.path}>
                {homeLink.linkName}
              </NavLink>

              {/* Europe Menu */}
              <Menu isOpen={isMenuEuropeOpen}>
                <MenuButton
                  onMouseEnter={onMenuEuropeOpen}
                  onMouseLeave={onMenuEuropeClose}
                  onClick={isMenuEuropeOpen ? onMenuEuropeClose : onMenuEuropeOpen}
                  fontWeight="semibold"
                  p="2"
                  _hover={{ bg: mode("blue.100", "blue.800") }}
                >
                  CHÂU ÂU {isMenuEuropeOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </MenuButton>
                <MenuList
                  onMouseEnter={onMenuEuropeOpen}
                  onMouseLeave={onMenuEuropeClose}
                  onClick={isMenuEuropeOpen ? onMenuEuropeClose : onMenuEuropeOpen}
                >
                  {europeLinks.map((link) => (
                    <MenuItem key={link.linkName} as={ReactLink} to={`/blog/country/${link.country}`}>
                      {link.linkName}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              {/* Asia Menu */}
              <Menu isOpen={isMenuAsiaOpen}>
                <MenuButton
                  onMouseEnter={onMenuAsiaOpen}
                  onMouseLeave={onMenuAsiaClose}
                  onClick={isMenuAsiaOpen ? onMenuAsiaClose : onMenuAsiaOpen}
                  fontWeight="semibold"
                  p="2"
                  _hover={{ bg: mode("blue.100", "blue.800") }}
                >
                  CHÂU Á {isMenuAsiaOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </MenuButton>
                <MenuList
                  onMouseEnter={onMenuAsiaOpen}
                  onMouseLeave={onMenuAsiaClose}
                  onClick={isMenuAsiaOpen ? onMenuAsiaClose : onMenuAsiaOpen}
                >
                  {asiaLinks.map((link) => (
                    <MenuItem key={link.linkName} as={ReactLink} to={`/blog/country/${link.country}`}>
                      {link.linkName}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              {/* America Menu */}
              <Menu isOpen={isMenuAmericaOpen}>
                <MenuButton
                  onMouseEnter={onMenuAmericaOpen}
                  onMouseLeave={onMenuAmericaClose}
                  onClick={isMenuAmericaOpen ? onMenuAmericaClose : onMenuAmericaOpen}
                  fontWeight="semibold"
                  p="2"
                  _hover={{ bg: mode("blue.100", "blue.800") }}
                >
                  CHÂU MỸ {isMenuAmericaOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </MenuButton>
                <MenuList
                  onMouseEnter={onMenuAmericaOpen}
                  onMouseLeave={onMenuAmericaClose}
                  onClick={isMenuAmericaOpen ? onMenuAmericaClose : onMenuAmericaOpen}
                >
                  {americaLinks.map((link) => (
                    <MenuItem key={link.linkName} as={ReactLink} to={`/blog/country/${link.country}`}>
                      {link.linkName}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              {/* Oceania Menu */}
              {(isOceaniaMenu ? (<Menu isOpen={isMenuOceaniaOpen}>
                <MenuButton
                  onMouseEnter={onMenuOceaniaOpen}
                  onMouseLeave={onMenuOceaniaClose}
                  onClick={isMenuOceaniaOpen ? onMenuOceaniaClose : onMenuOceaniaOpen}
                  fontWeight="semibold"
                  p="2"
                  _hover={{ bg: mode("blue.100", "blue.800") }}
                >
                  CHÂU ĐẠI DƯƠNG {isMenuOceaniaOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </MenuButton>
                <MenuList
                  onMouseEnter={onMenuOceaniaOpen}
                  onMouseLeave={onMenuOceaniaClose}
                  onClick={isMenuOceaniaOpen ? onMenuOceaniaClose : onMenuOceaniaOpen}
                >
                  {oceaniaLinks.map((link) => (
                    <MenuItem key={link.linkName} as={ReactLink} to={`/blog/country/${link.country}`}>
                      {link.linkName}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>):(<></>))}

              {/* Africa Menu */}
              {(isAfricaMenu) ? (<Menu isOpen={isMenuAfricaOpen}>
                <MenuButton
                  onMouseEnter={onMenuAfricaOpen}
                  onMouseLeave={onMenuAfricaClose}
                  onClick={isMenuAfricaOpen ? onMenuAfricaClose : onMenuAfricaOpen}
                  fontWeight="semibold"
                  p="2"
                  _hover={{ bg: mode("blue.100", "blue.800") }}
                >
                  CHÂU PHI {isMenuAfricaOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </MenuButton>
                <MenuList
                  onMouseEnter={onMenuAfricaOpen}
                  onMouseLeave={onMenuAfricaClose}
                  onClick={isMenuAfricaOpen ? onMenuAfricaClose : onMenuAfricaOpen}
                >
                  {africaLinks.map((link) => (
                    <MenuItem key={link.linkName} as={ReactLink} to={`/blog/country/${link.country}`}>
                      {link.linkName}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>) : (<></>)}

              {/* About and Contact Menu */}
              {links.map((link) => (
                <NavLink key={link.linkName} path={link.path}>
                  {link.linkName}
                </NavLink>
              ))}
              {/*               {userInfo && (
                <Link as={ReactLink} to="/admin-console">
                  <MdAdminPanelSettings size="30" />
                </Link>
              )} */}
            </HStack>
          </HStack>
          <Spacer display={{ base: "none", md: "block" }} />
          {/* Login Register area */}
          {userInfo ? (
            <Menu>
              <MenuButton>Hi {userInfo.name}</MenuButton>
              <MenuList>
                {userInfo.isAdmin || userInfo.isWriter ? (
                  <MenuItem key="Create Post" as={ReactLink} to={`/create-post`}>
                    Tạo bài viết mới
                  </MenuItem>
                ) : (
                  <></>
                )}
                <MenuItem onClick={logoutHandler}>Đăng xuất</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            /*             <HStack display={{ base: "none", md: "block" }}>
              <Button variant="link" onClick={logoutHandler} alignSelf="flex-start">
                Logout
              </Button>
            </HStack> */
            <HStack display={{ base: "none", md: "block" }}>
              {authLinks.map((link) => (
                <NavAuthLink key={link.linkName} path={link.path}>
                  {link.linkName}
                </NavAuthLink>
              ))}
            </HStack>
          )}

          <HStack>
            {/* Hide social media icons */}
            {/* <ButtonGroup spacing="0" variant="ghost" mr="3" display={{ base: "none", md: "flex" }}>
            <IconButton as="a" href="#" icon={<FaFacebook fontSize="1.25rem" />} />
            <IconButton as="a" href="#" icon={<FaTwitter fontSize="1.25rem" />} />
            <IconButton as="a" href="#" icon={<FaYoutube fontSize="1.25rem" />} />
            <IconButton as="a" href="#" icon={<FaInstagram fontSize="1.25rem" />} />
          </ButtonGroup> */}

            <Icon
              cursor="pointer"
              as={colorMode === "light" ? MoonIcon : SunIcon}
              onClick={() => toggleColorMode()}
              w="40px"
            />
          </HStack>
        </Flex>
      </Container>
      {isIconOpen ? (
        <Box pb="4" display={{ md: "none" }} ref={menuRef}>
          {userInfo ? null : (
            <>
              <NavLink key="login" path="/login">
                Đăng Nhập
              </NavLink>
              <NavLink key="register" path="/register">
                Đăng Ký
              </NavLink>
            </>
                
          )}

{/*           <Menu isOpen={isMenuOpenMobile}>
            <MenuButton
              onClick={isMenuOpenMobile ? onMenuCloseMobile : onMenuOpenMobile}
              onMouseEnter={onMenuOpenMobile}
              onMouseLeave={onMenuCloseMobile}
              textAlign="left"
              w="full"
              mt="3"
              fontWeight="semibold"
              p="2"
              //_hover={{ bg: mode("blue.100", "blue.800") }}
            >
              Blog {isMenuOpenMobile ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList
              onMouseEnter={onMenuOpenMobile}
              onMouseLeave={onMenuCloseMobile}
              onClick={isMenuOpenMobile ? onMenuCloseMobile : onMenuOpenMobile}
            >
              {blogLinks.map((link) => (
                <MenuItem key={link.linkName} as={ReactLink} to={`/blog/${link.category}`}>
                  {link.linkName}
                </MenuItem>
              ))}
            </MenuList>
          </Menu> */}

          {/* Home page link */}
          <Stack as="nav" spacing="4" pt="4">
            <NavLink key={homeLink.linkName} path={homeLink.path}>
              {homeLink.linkName}
            </NavLink>
          </Stack>

          {/* Europe Mobile Menu */}
          {/* <Menu isOpen={isMenuEuropeOpenMobile}>
            <MenuButton
              onClick={isMenuEuropeOpenMobile ? onMenuEuropeCloseMobile : onMenuEuropeOpenMobile}
              onMouseEnter={onMenuEuropeOpenMobile}
              onMouseLeave={onMenuEuropeCloseMobile}
              textAlign="left"
              w="full"
              mt="3"
              fontWeight="semibold"
              p="2"
              //_hover={{ bg: mode("blue.100", "blue.800") }}
            >
              CHÂU ÂU {isMenuEuropeOpenMobile ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList
              onMouseEnter={onMenuEuropeOpenMobile}
              onMouseLeave={onMenuEuropeCloseMobile}
              onClick={isMenuEuropeOpenMobile ? onMenuEuropeCloseMobile : onMenuEuropeOpenMobile}
            >
              {europeLinks.map((link) => (
                <MenuItem key={link.linkName} as={ReactLink} to={`/blog/country/${link.country}`}>
                  {link.linkName}
                </MenuItem>
              ))}
            </MenuList>
          </Menu> */}

          {/* Asia Mobile Menu */}
          {/* <Menu isOpen={isMenuAsiaOpenMobile}>
            <MenuButton
              onClick={isMenuAsiaOpenMobile ? onMenuAsiaCloseMobile : onMenuAsiaOpenMobile}
              onMouseEnter={onMenuAsiaOpenMobile}
              onMouseLeave={onMenuAsiaCloseMobile}
              textAlign="left"
              w="full"
              mt="3"
              fontWeight="semibold"
              p="2"
              //_hover={{ bg: mode("blue.100", "blue.800") }}
            >
              CHÂU Á {isMenuAsiaOpenMobile ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList
              onMouseEnter={onMenuAsiaOpenMobile}
              onMouseLeave={onMenuAsiaCloseMobile}
              onClick={isMenuAsiaOpenMobile ? onMenuAsiaCloseMobile : onMenuAsiaOpenMobile}
            >
              {asiaLinks.map((link) => (
                <MenuItem key={link.linkName} as={ReactLink} to={`/blog/country/${link.country}`}>
                  {link.linkName}
                </MenuItem>
              ))}
            </MenuList>
          </Menu> */}

          {/* America Mobile Menu */}
          {/* <Menu isOpen={isMenuAmericaOpenMobile}>
            <MenuButton
              onClick={isMenuAmericaOpenMobile ? onMenuAmericaCloseMobile : onMenuAmericaOpenMobile}
              onMouseEnter={onMenuAmericaOpenMobile}
              onMouseLeave={onMenuAmericaCloseMobile}
              textAlign="left"
              w="full"
              mt="3"
              fontWeight="semibold"
              p="2"
              //_hover={{ bg: mode("blue.100", "blue.800") }}
            >
              CHÂU MỸ {isMenuAmericaOpenMobile ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList
              onMouseEnter={onMenuAmericaOpenMobile}
              onMouseLeave={onMenuAmericaCloseMobile}
              onClick={isMenuAmericaOpenMobile ? onMenuAmericaCloseMobile : onMenuAmericaOpenMobile}
            >
              {americaLinks.map((link) => (
                <MenuItem key={link.linkName} as={ReactLink} to={`/blog/country/${link.country}`}>
                  {link.linkName}
                </MenuItem>
              ))}
            </MenuList>
          </Menu> */}

          {/* Oceania Mobile Menu */}
          {/* {(isOceaniaMenu) ? (<Menu isOpen={isMenuOceaniaOpenMobile}>
            <MenuButton
              onClick={isMenuOceaniaOpenMobile ? onMenuOceaniaCloseMobile : onMenuOceaniaOpenMobile}
              onMouseEnter={onMenuOceaniaOpenMobile}
              onMouseLeave={onMenuOceaniaCloseMobile}
              textAlign="left"
              w="full"
              mt="3"
              fontWeight="semibold"
              p="2"
              //_hover={{ bg: mode("blue.100", "blue.800") }}
            >
              CHÂU ĐẠI DƯƠNG {isMenuOceaniaOpenMobile ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList
              onMouseEnter={onMenuOceaniaOpenMobile}
              onMouseLeave={onMenuOceaniaCloseMobile}
              onClick={isMenuOceaniaOpenMobile ? onMenuOceaniaCloseMobile : onMenuOceaniaOpenMobile}
            >
              {oceaniaLinks.map((link) => (
                <MenuItem key={link.linkName} as={ReactLink} to={`/blog/country/${link.country}`}>
                  {link.linkName}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>):(<></>)} */}

          {/* Africa Mobile Menu */}
          {/* {(isAfricaMenu) ? (<Menu isOpen={isMenuAfricaOpenMobile}>
            <MenuButton
              onClick={isMenuAfricaOpenMobile ? onMenuAfricaCloseMobile : onMenuAfricaOpenMobile}
              onMouseEnter={onMenuAfricaOpenMobile}
              onMouseLeave={onMenuAfricaCloseMobile}
              textAlign="left"
              w="full"
              mt="3"
              fontWeight="semibold"
              p="2"
              //_hover={{ bg: mode("blue.100", "blue.800") }}
            >
              CHÂU PHI {isMenuAfricaOpenMobile ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList
              onMouseEnter={onMenuAfricaOpenMobile}
              onMouseLeave={onMenuAfricaCloseMobile}
              onClick={isMenuAfricaOpenMobile ? onMenuAfricaCloseMobile : onMenuAfricaOpenMobile}
            >
              {africaLinks.map((link) => (
                <MenuItem key={link.linkName} as={ReactLink} to={`/blog/country/${link.country}`}>
                  {link.linkName}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>) : (<></>)} */}

          {/* About and Contact Menu */}
          <Stack as="nav" spacing="4" pt="4">
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </Stack>
          {/*           {userInfo && (
            <Link as={ReactLink} to="/admin-console">
              <MdAdminPanelSettings size="30" />
            </Link>
          )} */}
          {/* Hide social media icons */}
          {/* <ButtonGroup spacing="0" variant="ghost" mr="3" mt="5">
            <IconButton as="a" href="#" icon={<FaFacebook fontSize="1.25rem" />} />
            <IconButton as="a" href="#" icon={<FaTwitter fontSize="1.25rem" />} />
            <IconButton as="a" href="#" icon={<FaYoutube fontSize="1.25rem" />} />
            <IconButton as="a" href="#" icon={<FaInstagram fontSize="1.25rem" />} />
          </ButtonGroup> */}
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
