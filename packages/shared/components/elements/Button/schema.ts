import { z } from "zod/v4";

export const buttonSchema = z
  .object({
    label: z.string().meta({ description: "The text that goes inside the button." }),
    link: z.string().meta({ description: "The URL that the button should link to." }).optional(),
    iconName: z
      .string()
      .meta({
        description:
          "The name of the icon to display. See the Icon component documentation for more information.",
      })
      .optional(),
    iconPosition: z
      .enum(["before", "after"])
      .meta({ description: "The position of the icon relative to the label." })
      .default("before"),

    hideText: z
      .boolean()
      .meta({ description: "Whether to hide the button text and show only the icon." })
      .default(false),

    type: z
      .enum(["primary", "secondary", "ghost", "contrast", "fade"])
      .meta({ description: "The presentation of button." })
      .default("ghost"),

    outline: z
      .boolean()
      .meta({ description: "Whether the button should have an outline." })
      .default(false),

    size: z.enum(["sm", "md", "lg"]).meta({ description: "The size of the button." }).default("md"),
    layout: z
      .enum(["full", "skinny", "normal"])
      .meta({ description: "The layout of the button." })
      .default("normal"),

    className: z
      .string()
      .meta({
        description: "Additional CSS classes to add to the button element.",
      })
      .optional(),
  })
  .meta({
    title: "Button",
    description:
      "A clickable element that navigates to another page or triggers an action within the current page.",
  });

export type ButtonProps = z.infer<typeof buttonSchema>;
