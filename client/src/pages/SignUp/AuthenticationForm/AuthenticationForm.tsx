import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Divider,
	Flex,
	Group,
	Paper,
	type PaperProps,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { GoogleButton } from "./GoogleButton";
import { XButton } from "./XButton";

export function AuthenticationForm(props: PaperProps) {
	const [type, toggle] = useToggle(["log in", "sign up"]);
	const form = useForm({
		initialValues: {
			email: "",
			name: "",
			password: "",
			terms: true,
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
			password: (val) =>
				val.length <= 6
					? "Password should include at least 6 characters"
					: null,
		},
	});

	return (
		<Container size={420} my={40}>
			<Flex direction="column">
				<Paper radius="md" p="xl" withBorder {...props}>
					<Text size="lg" fw={500}>
						Welcome to letteranne, {type} with
					</Text>

					<Group grow mb="md" mt="md">
						<GoogleButton radius="xl">Google</GoogleButton>
						<XButton radius="xl">X.com</XButton>
					</Group>

					<Divider
						label="Or continue with email"
						labelPosition="center"
						my="lg"
					/>

					<form onSubmit={form.onSubmit(() => {})}>
						<Stack>
							{type === "sign up" && (
								<TextInput
									label="Name"
									placeholder="Your name"
									value={form.values.name}
									onChange={(event) =>
										form.setFieldValue("name", event.currentTarget.value)
									}
									radius="md"
								/>
							)}

							<TextInput
								required
								label="Email"
								placeholder="hello@mantine.dev"
								value={form.values.email}
								onChange={(event) =>
									form.setFieldValue("email", event.currentTarget.value)
								}
								error={form.errors.email && "Invalid email"}
								radius="md"
							/>

							<PasswordInput
								required
								label="Password"
								placeholder="Your password"
								value={form.values.password}
								onChange={(event) =>
									form.setFieldValue("password", event.currentTarget.value)
								}
								error={
									form.errors.password &&
									"Password should include at least 6 characters"
								}
								radius="md"
							/>

							{type === "sign up" && (
								<Checkbox
									label="I accept terms and conditions"
									checked={form.values.terms}
									onChange={(event) =>
										form.setFieldValue("terms", event.currentTarget.checked)
									}
								/>
							)}
						</Stack>

						<Group justify="flex-end" mt="xl">
							<Button type="submit" radius="xl">
								{upperFirst(type)}
							</Button>
						</Group>
					</form>
				</Paper>
				<Paper mt={5} radius="md" p="md" withBorder>
					{type === "sign up"
						? "Already have an account? "
						: "Don't have an account? "}
					<Anchor component="button" type="button" onClick={() => toggle()}>
						{type === "sign up" ? "Log In" : "Sign Up"}
					</Anchor>
				</Paper>
			</Flex>
		</Container>
	);
}
