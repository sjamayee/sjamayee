                 SCons - a software construction tool

                         Version 2.0.1

This is SCons, a tool for building software (and other files).
SCons is implemented in Python, and its "configuration files" are actually Python scripts, allowing you to use the full power of a real scripting language to solve build problems.
You do not, however, need to know Python to use SCons effectively.

See the RELEASE.txt file for notes about this specific release, including known problems.  See the CHANGES.txt file for a list of changes since the previous release.

LATEST VERSION
==============
Before going further, you can check that this package you have is the latest version by checking the SCons download page at: http://www.scons.org/download.html

EXECUTION REQUIREMENTS
======================
Running SCons requires Python version 2.4 or later.
There should be no other dependencies or requirements to run SCons.
(There is, however, an additional requirement to *install* SCons from this particular package; see the next section.)

By default, SCons knows how to search for available programming tools on various systems--see the SCons man page for details.
You may, of course, override the default SCons choices made by appropriate configuration of Environment construction variables.

INSTALLATION REQUIREMENTS
=========================
Nothing special.

INSTALLATION
============
Assuming your system satisfies the installation requirements in the previous section, install SCons from this package simply by running the provided Python-standard setup script as follows:

        # python setup.py install

By default, the above command will do the following:

Install the version-numbered "scons-2.0.1" and "sconsign-2.0.1" scripts in the default system script directory (/usr/bin or C:\Python*\Scripts, for example).
This can be disabled by specifying the "--no-version-script" option on the command line.

Install scripts named "scons" and "sconsign" scripts in the default system script directory (/usr/bin or C:\Python*\Scripts, for example).
This can be disabled by specifying the "--no-scons-script" option on the command line, which is useful if you want to install and experiment with a new version before making it the default on your system.
On UNIX or Linux systems, you can have the "scons" and "sconsign" scripts be hard links or symbolic links to the "scons-2.0.1" and "sconsign-2.0.1" scripts by specifying the "--hardlink-scons" or "--symlink-scons" options on the command line.

Install "scons-2.0.1.bat" and "scons.bat" wrapper scripts in the Python prefix directory on Windows (C:\Python*, for example).
This can be disabled by specifying the "--no-install-bat" option on the command line.
On UNIX or Linux systems, the "--install-bat" option may be specified to have "scons-2.0.1.bat" and "scons.bat" files installed in the default system script directory, which is useful if you want to install SCons in a shared file system directory that can be used to execute SCons from both UNIX/Linux and Windows systems.

Install the SCons build engine (a Python module) in an appropriate version-numbered SCons library directory (/usr/lib/scons-2.0.1 or C:\Python*\scons-2.0.1, for example).
See below for more options related to installing the build engine library.

Install the troff-format man pages in an appropriate directory on UNIX or Linux systems (/usr/share/man/man1 or /usr/man/man1, for example).
This can be disabled by specifying the "--no-install-man" option on the command line.
The man pages can be installed on Windows systems by specifying the "--install-man" option on the command line.

Note that, by default, SCons does not install its build engine library in the standard Python library directories.
If you want to be able to use the SCons library modules (the build engine) in other Python scripts, specify the "--standard-lib" option on the command line, as follows:

        # python setup.py install --standard-lib

This will install the build engine in the standard Python library directory (/usr/lib/python*/site-packages or C:\Python*\Lib\site-packages).

Alternatively, you can have SCons install its build engine library in a hard-coded standalone library directory, instead of the default version-numbered directory, by specifying the "--standalone-lib" option on the command line, as follows:

        # python setup.py install --standalone-lib

This is usually not recommended, however.

Note that, to install SCons in any of the above system directories, you should have system installation privileges (that is, "root" or "Administrator") when running the setup.py script.
If you don't have system installation privileges, you can use the --prefix option to specify an alternate installation location, such as your home directory:

        $ python setup.py install --prefix=$HOME

This will install SCons in the appropriate locations relative to $HOME--that is, the scons script itself $HOME/bin and the associated library in $HOME/lib/scons, for example.