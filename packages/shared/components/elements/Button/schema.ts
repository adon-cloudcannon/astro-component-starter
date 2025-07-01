import { z } from "zod/v4";

export const buttonSchema = z
  .object({
    label: z.string().meta({ description: "The text that goes inside the button." }),
    link: z.string().meta({ description: "The URL that the button should link to." }).optional(),
    icon: z
      .object({
        name: z
          .string()
          .meta({
            description:
              "The name of the icon to display. See the Icon component documentation for more information.",
          })
          .optional(),
        position: z
          .enum(["before", "after"])
          .meta({ description: "The position of the icon relative to the label." })
          .default("before"),
      })
      .optional()
      .meta({ description: "The icon to display on the button." }),

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

    id: z.string().meta({ description: "The ID attribute for the button element." }).optional(),
    className: z
      .string()
      .meta({
        description: "Additional CSS classes to add to the button element.",
      })
      .optional(),
    customStyle: z
      .string()
      .meta({ description: "Inline CSS styles to apply to the button element." })
      .optional(),
    disabled: z.boolean().meta({ description: "Whether the button is disabled." }).default(false),
    aria: z
      .object({
        label: z.string().meta({ description: "Accessibility label for the button." }).optional(),
        describedBy: z
          .string()
          .meta({ description: "ID of an element that describes the button." })
          .optional(),
        expanded: z
          .boolean()
          .meta({
            description: "Indicates whether a control is expanded or collapsed.",
          })
          .optional(),
        controls: z
          .string()
          .meta({ description: "ID of an element controlled by the button." })
          .optional(),
      })
      .optional()
      .meta({ description: "Accessibility attributes for the button element." }),
  })
  .meta({
    title: "Button",
    description:
      "A clickable element that navigates to another page or triggers an action within the current page.",
  });

export type ButtonProps = z.infer<typeof buttonSchema>;
