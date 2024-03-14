import { Button, type ButtonProps } from "@mantine/core";

function XIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="100"
			height="100"
			viewBox="0 0 48 48"
			style={{ width: "1rem", height: "1rem" }}
		>
			<title>X (Twitter)</title>
			<polygon fill="#616161" points="41,6 9.929,42 6.215,42 37.287,6" />
			<polygon
				fill="#fff"
				fill-rule="evenodd"
				points="31.143,41 7.82,7 16.777,7 40.1,41"
				clip-rule="evenodd"
			/>
			<path
				fill="#616161"
				d="M15.724,9l20.578,30h-4.106L11.618,9H15.724 M17.304,6H5.922l24.694,36h11.382L17.304,6L17.304,6z"
			/>
		</svg>
	);
}

export function XButton(
	props: ButtonProps & React.ComponentPropsWithoutRef<"button">,
) {
	return <Button leftSection={<XIcon />} variant="default" {...props} />;
}
