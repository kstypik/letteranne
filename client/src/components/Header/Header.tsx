import {
	Autocomplete,
	Avatar,
	Burger,
	Group,
	Menu,
	Text,
	UnstyledButton,
	rem,
	useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconChevronDown,
	IconHeart,
	IconLogout,
	IconMailHeart,
	IconMessage,
	IconPlayerPause,
	IconSearch,
	IconSettings,
	IconStar,
	IconSwitchHorizontal,
	IconTrash,
} from "@tabler/icons-react";
import cx from "clsx";
import { useState } from "react";
import classes from "./Header.module.css";

const user = {
	name: "Anne Blythe",
	email: "anne@blythe.nonexistent",
	image:
		"https://static1.personality-database.com/profile_images/ec601a901c2042289159aef8128ec3c5.png",
};

const links = [
	{ link: "/", label: "Home" },
	{ link: "/", label: "Inbox" },
	{ link: "/", label: "Meet" },
	{ link: "/", label: "Settings" },
];

export function Header() {
	const [opened, { toggle }] = useDisclosure(false);
	const theme = useMantineTheme();
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	const items = links.map((link) => (
		<a
			key={link.label}
			href={link.link}
			className={classes.link}
			onClick={(event) => event.preventDefault()}
		>
			{link.label}
		</a>
	));

	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<Group>
					<Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
					<IconMailHeart />
				</Group>

				<Group>
					<Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
						{items}
					</Group>
					<Autocomplete
						className={classes.search}
						placeholder="Search"
						leftSection={
							<IconSearch
								style={{ width: rem(16), height: rem(16) }}
								stroke={1.5}
							/>
						}
						data={["Letter 1", "Letter 2", "Letter 3"]}
						visibleFrom="xs"
					/>
					<Menu
						width={260}
						position="bottom-end"
						transitionProps={{ transition: "pop-top-right" }}
						onClose={() => setUserMenuOpened(false)}
						onOpen={() => setUserMenuOpened(true)}
						withinPortal
					>
						<Menu.Target>
							<UnstyledButton
								className={cx(classes.user, {
									[classes.userActive]: userMenuOpened,
								})}
							>
								<Group gap={7}>
									<Avatar
										src={user.image}
										alt={user.name}
										radius="xl"
										size={20}
									/>
									<Text fw={500} size="sm" lh={1} mr={3}>
										{user.name}
									</Text>
									<IconChevronDown
										style={{ width: rem(12), height: rem(12) }}
										stroke={1.5}
									/>
								</Group>
							</UnstyledButton>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item
								leftSection={
									<IconHeart
										style={{ width: rem(16), height: rem(16) }}
										color={theme.colors.red[6]}
										stroke={1.5}
									/>
								}
							>
								Liked letters
							</Menu.Item>
							<Menu.Item
								leftSection={
									<IconStar
										style={{ width: rem(16), height: rem(16) }}
										color={theme.colors.yellow[6]}
										stroke={1.5}
									/>
								}
							>
								Favorite letters
							</Menu.Item>
							<Menu.Item
								leftSection={
									<IconMessage
										style={{ width: rem(16), height: rem(16) }}
										color={theme.colors.blue[6]}
										stroke={1.5}
									/>
								}
							>
								Your letters
							</Menu.Item>

							<Menu.Label>Settings</Menu.Label>
							<Menu.Item
								leftSection={
									<IconSettings
										style={{ width: rem(16), height: rem(16) }}
										stroke={1.5}
									/>
								}
							>
								Account settings
							</Menu.Item>
							<Menu.Item
								leftSection={
									<IconSwitchHorizontal
										style={{ width: rem(16), height: rem(16) }}
										stroke={1.5}
									/>
								}
							>
								Change account
							</Menu.Item>
							<Menu.Item
								leftSection={
									<IconLogout
										style={{ width: rem(16), height: rem(16) }}
										stroke={1.5}
									/>
								}
							>
								Logout
							</Menu.Item>

							<Menu.Divider />

							<Menu.Label>Danger zone</Menu.Label>
							<Menu.Item
								leftSection={
									<IconPlayerPause
										style={{ width: rem(16), height: rem(16) }}
										stroke={1.5}
									/>
								}
							>
								Pause subscription
							</Menu.Item>
							<Menu.Item
								color="red"
								leftSection={
									<IconTrash
										style={{ width: rem(16), height: rem(16) }}
										stroke={1.5}
									/>
								}
							>
								Delete account
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</div>
		</header>
	);
}
