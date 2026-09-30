/**
 * @vitest-environment jsdom
 */

//Editing News as Admin Testing
//To Test: only admin are allowed, is required fields required (except for image)

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NewsContent } from "./NewsContent";
import { NewsPost } from "../../mockData";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// type FakeUser = { id: string; email: string; steamId?: string | null };


vi.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: vi.fn(),
    })
}))

vi.mock('next/link', () => ({
    default: ({children, href}: any) => (
        <a href={href}>{children}</a>
    )
}))

vi.mock('@/components/ui/RichTextEditor', () => ({
  RichTextEditor: ({ onChange }: any) => (
    <>
        <button
        data-testid="set-content"
        onClick={() =>
            onChange({
            read: (callback: any) => {
                callback()
            },
            toJSON: () => ({
                root: {
                children: [
                    {
                    type: 'paragraph',
                    children: [
                        {
                        text: 'Some updated content inserted here.',
                        },
                    ],
                    },
                ],
                },
            }),
            })
        }
        >
        Set content
        </button>

        <button
        data-testid="set-empty-content"
        onClick={() =>
            onChange({
            read: (callback: any) => {
                callback()
            },
            toJSON: () => ({
                root: {
                children: [],
                },
            }),
            })
        }
        >
        Set empty content
        </button>
    </>
  ),
}))

const ExamplePost : NewsPost = {
    id: 1,
    title: 'Example News',
    content: {
        root: {
            type: 'root',
            direction: null,
            format: '',
            indent: 0,
            version: 1,
            children: []
        }
    },
    date: '',
    description: 'This is a description',
}

afterEach(() => {
  cleanup();
});

describe("NewsContent", () => {
    it("denies everyone who's not an admin", () => {
        render(<NewsContent post={ExamplePost} isAdmin={false} />);

        expect(
            screen.queryByRole("button", {name: "Edit post"})
        ).not.toBeInTheDocument();
    });

    it("shows for admins", () => {
        render(<NewsContent post={ExamplePost} isAdmin={true} />);

        expect(
            screen.getByRole("button", {name: "Edit post"})
        ).toBeInTheDocument();
    })
});

describe("NewsContent", () => {
    it("submits when the title and description are not empty", async () => {
        const user = userEvent.setup();
        
        render(<NewsContent post={ExamplePost} isAdmin={true}/>);

        //enter editing mode
        await user.click(screen.getByRole('button', {name: "Edit post"}));

        //Title edit
        const title = screen.getByPlaceholderText('Title')
        await user.clear(title)
        await user.type(title, "Good Title");

        //Content edit
        await user.click(screen.getByTestId('set-content')) //set content is in the mock RichTextEditor

        await user.click(
            screen.getByRole("button", {name: "Save changes"})
        );

        expect(
            screen.queryByPlaceholderText('Title')
        ).not.toBeInTheDocument();

        expect(
            screen.queryByText("Title and content are required.")
        ).not.toBeInTheDocument();

        expect(
            screen.queryByRole('button', {name: 'Save changes'})
        ).not.toBeInTheDocument();

        expect(
            screen.getByRole('heading', {name: "Good Title"})
        ).toBeInTheDocument();
    });

    it("will not submit if the title and description are empty", async () => {
        const user = userEvent.setup();
        
        render(<NewsContent post={ExamplePost} isAdmin={true}/>);

        //enter editing mode
        await user.click(screen.getByRole('button', {name: "Edit post"}));

        //Title edit - make it empty
        const title = screen.getByPlaceholderText('Title')
        await user.clear(title)

        //Content edit - make it empty
        await user.click(screen.getByTestId('set-empty-content')) //set empty content is in the mock RichTextEditor

        await user.click(
            screen.getByRole("button", {name: "Save changes"})
        );

        expect(
            screen.getByText("Title and content are required.")
        ).toBeInTheDocument();
    });
    
    it("will not submit if only the title is empty", async () => {
        const user = userEvent.setup();
        
        render(<NewsContent post={ExamplePost} isAdmin={true}/>);

        //enter editing mode
        await user.click(screen.getByRole('button', {name: "Edit post"}));

        //Title edit - make it empty
        const title = screen.getByPlaceholderText('Title')
        await user.clear(title)

        //Content edit
        await user.click(screen.getByTestId('set-content')) //set content is in the mock RichTextEditor

        await user.click(
            screen.getByRole("button", {name: "Save changes"})
        );

        expect(
            screen.getByText("Title and content are required.")
        ).toBeInTheDocument();
    });

    it("will not submit if only the description is empty", async () => {
        const user = userEvent.setup();
        
        render(<NewsContent post={ExamplePost} isAdmin={true}/>);

        //enter editing mode
        await user.click(screen.getByRole('button', {name: "Edit post"}));

        //Title edit - make it empty
        const title = screen.getByPlaceholderText('Title')
        await user.clear(title)
        await user.type(title, "Good Title")

        //Content edit
        await user.click(screen.getByTestId('set-empty-content')) //set content is in the mock RichTextEditor

        await user.click(
            screen.getByRole("button", {name: "Save changes"})
        );

        expect(
            screen.getByText("Title and content are required.")
        ).toBeInTheDocument();
    });
})
