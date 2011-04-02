def js_builder(target, source, env):
  """ A JavaScript builder using Google Closure Compiler. """

  cmd = env.subst("$JAVA -jar $JS_COMPILER --compilation_level $JS_COMPILATION_LEVEL");

  # Add defines to the command
  #for define in env['JS_DEFINES'].keys():
  #  cmd += " --define=\"%s=%s\"" % (define, env['JS_DEFINES'][define])

  # Add the source files
  for file in source:
    cmd += " --js " + str(file)

  # Add the output file
  cmd += " --js_output_file " + str(target[0])

  # Log the command and run
  print env.subst(cmd)
  os.system(env.subst(cmd))

#  cmd += ' -e "s/__SJA_BUILD_DATE__/${SJA_BUILD_DATE}/"'
def sjamayee_stamper(target, source, env):
  """ A Build Stamper for Sjamayee """

  cmd =  "sed "
  cmd += " -e s/__SJA_BUILD_PREFIX__/$SJA_BUILD_PREFIX/"
  #cmd += " -e s/__SJA_BUILD_VERSION__/$SJA_BUILD_VERSION/"
  cmd += ("%s > %s" % (source[0], target[0]))

  import os
  print env.subst(cmd)
  os.system(env.subst(cmd))
  
env = Environment()
env['JAVA'] = "/usr/bin/java"
env['JS_COMPILER'] = "build/tools/compiler.jar"
env['JS_COMPILATION_LEVEL'] = "ADVANCED_OPTIMIZATIONS" #WHITESPACE_ONLY,SIMPLE_OPTIZATIONS,ADVANCED_OPTIMIZATIONS

env['SJA_BUILD_PREFIX'] = "Sjamayee"
#env['SJA_BUILD_VERSION'] = "1-0"
#env['SJA_BUILD_DATE'] = "2011-01-15"

env.Append(BUILDERS = {'JavaScript': Builder(action = js_builder),
                       'SjamayeeStamp': Builder(action = sjamayee_stamper)})

import os
output = os.popen("ls -l").read()
print output
print env

sources = ["src/sjamayee/js/pmvc/SjamayeeFacade.js", "src/sjamayee/js/pmvc/view/components/Sjamayee.js", "src/sjamayee/js/pmvc/view/components/common/UIComponent.js"]
#env.JavaScript("sjamayee.min.adv.js", sources)
#env.SjamayeeStamp("sjamayee.stamped.js","sjamayee.min.adv.js", env)

env.SjamayeeStamp("SjamayeeFacade.stamped.js","src/sjamayee/js/pmvc/SjamayeeFacade.js", env)

cmd =  "sed "
cmd += " -e s/__VEX_BUILD_PREFIX__/$VEX_BUILD_PREFIX/"
cmd += " -e s/__VEX_VERSION__/$VEX_VERSION/"
cmd += ' -e "s/__VEX_BUILD_DATE__/${VEX_BUILD_DATE}/"'
cmd += " -e s/__VEX_GIT_SHA1__/`git rev-list --max-count=1 HEAD`/ "
cmd += ("%s > %s" % (source[0], target[0]))

sed -e s/__SJA_BUILD_PREFIX__/SjAMayEE/ src/sjamayee/js/pmvc/SjamayeeFacade.js > sf-stamped.js












