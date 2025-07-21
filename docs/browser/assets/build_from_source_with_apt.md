# Build a Package from APT repository and Create a Patch

In this post I use the software **pluma** for demonstration and a **GNU/Linux**
operating system that uses **APT** package management.

## Build from a source package

First, you need to verify that **pkg-dev** and **devscripts** are installed on
your system.

Get the source package:

```
apt-get source pluma
```

Change to the source tree and make changes in pluma source code:

```
cd pluma-1.24.0/
```

For example of changes in source code, try add the lines indicated below on
file *pluma/pluma-print-job.c* for adjust margins when print the file to PDF.

#### **`pluma/pluma-print-job.c`**
```c
/* More lines of source code in the original file */
	  
static void
create_compositor (PlumaPrintJob *job)
{
	gchar *print_font_body;
	gchar *print_font_header;
	gchar *print_font_numbers;
	gdouble margin_left_right = 25.0, margin_top_bottom = 15.0; /* ADD THIS LINE */
	
	/* Create and initialize print compositor */
	print_font_body = pluma_prefs_manager_get_print_font_body ();
	print_font_header = pluma_prefs_manager_get_print_font_header ();
	print_font_numbers = pluma_prefs_manager_get_print_font_numbers ();
	
	job->priv->compositor = GTK_SOURCE_PRINT_COMPOSITOR (
					g_object_new (GTK_SOURCE_TYPE_PRINT_COMPOSITOR,
						     "buffer", GTK_SOURCE_BUFFER (job->priv->doc),
						     "tab-width", gtk_source_view_get_tab_width (GTK_SOURCE_VIEW (job->priv->view)),
						     "highlight-syntax", gtk_source_buffer_get_highlight_syntax (GTK_SOURCE_BUFFER (job->priv->doc)) &&
					   				 pluma_prefs_manager_get_print_syntax_hl (),
						     "wrap-mode", pluma_prefs_manager_get_print_wrap_mode (),
						     "print-line-numbers", pluma_prefs_manager_get_print_line_numbers (),
						     "print-header", pluma_prefs_manager_get_print_header (),
						     "print-footer", FALSE,
						     "body-font-name", print_font_body,
						     "line-numbers-font-name", print_font_numbers,
						     "header-font-name", print_font_header,
						     NULL));

        /* ADD THESE LINES */
        gtk_source_print_compositor_set_left_margin (job->priv->compositor, margin_left_right, GTK_UNIT_MM);
        gtk_source_print_compositor_set_right_margin (job->priv->compositor, margin_left_right, GTK_UNIT_MM);
        gtk_source_print_compositor_set_top_margin (job->priv->compositor, margin_top_bottom, GTK_UNIT_MM);
        gtk_source_print_compositor_set_bottom_margin (job->priv->compositor, margin_top_bottom, GTK_UNIT_MM);
        
        g_free (print_font_body);
        g_free (print_font_header);
        g_free (print_font_numbers);

        /* more lines of source code in this function not presented here */
}

/* more lines of source code not presented here */
```

Install needed build-dependencies:

```
sudo apt-get build-dep pluma
```

The following commands create a dedicated version of the build:

```
dch -l local 'pluma with margins adjusted for print to PDF file'
dpkg-source --commit
```

The last command will prompt for a patch name and open the patch file created
for modifications. Make the changes as you like, save the file and exit.

Build the package:

```
debuild -us -uc
```

After finish the build without errors, install the package:

```
sudo dpkg -i ../*.deb
```

The program with the changes made now should be installed in the OS.

![Screen named About Pluma, present in Pluma application](/assets/pluma_installed.png)

## Apply a patch to the source code

```
cd pluma-1.24.0/
patch --dry-run -ru -p1 &lt; ../pluma-margins-print-PDF.patch
patch -ru -p1 &lt; ../pluma-margins-print-PDF.patch
```
