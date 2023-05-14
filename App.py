import tkinter as tk
from tkinter import ttk
import main
def center_window(root):
    window_width = 300
    window_height = 150

    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()

    x_coordinate = (screen_width - window_width) // 2
    y_coordinate = (screen_height - window_height) // 2

    root.geometry(f"{window_width}x{window_height}+{x_coordinate}+{y_coordinate}")


def close_window():
    root.destroy()

# Create the main window without the header
root = tk.Tk()
root.title("Strawberry: IoT with Raspberry")
root.overrideredirect(True)  # Disable the header

# Define the color palette
color_primary = '#B25F5B'
color_secondary = '#000000'
color_info = '#F7C873'

# Create a style object for Material UI design
style = ttk.Style()

# Configure the label style with the primary color
style.configure("TLabel", foreground=color_primary, font=("Roboto", 14, "bold"))

# Configure the button style with the primary and secondary colors
style.configure("TButton", foreground=color_secondary, background=color_primary, font=("Roboto", 12, "bold"))

# Create and place the labels
title_label = ttk.Label(root, text="Strawberry: IoT with Raspberry", style="TLabel")
title_label.pack(pady=20)

running_label = ttk.Label(root, text="Is running", style="TLabel")
running_label.pack()

# Create and place the close button
close_button = ttk.Button(root, text="Close", style="TButton", command=close_window)
close_button.pack()

# Center the window on the screen
root.update_idletasks()  # Ensure window dimensions are updated
center_window(root)


# start this loop while the tkliner running
main.setup()
main.loop()

# Start the main event loop
root.mainloop()
