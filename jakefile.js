var fs = require('fs'),
	njake = require('./src/njake'),
	msbuild = njake.msbuild,
	nunit = njake.nunit,
	nuget = njake.nuget,
	config = {
		version: fs.readFileSync('VERSION', 'utf-8')
	};

console.log('SimpleJson v' + config.version)

msbuild.setDefaults({
	properties: { Configuration: 'Release' },
	processor: 'x86',
	version: 'net4.0'
})

nunit.setDefaults({
	_exe: 'src/packages/NUnit.2.5.10.11092/tools/nunit-console-x86.exe'
})

nuget.setDefaults({
	_exe: 'src/packages/NuGet.CommandLine.1.7.0/tools/NuGet.exe',
	verbose: true
})

desc('Build all')
task('default', ['clean', 'build', 'test', 'nuget:pack'])

namespace('build', function () {

    desc('Build Portble Class Library (with LINQ Expression)')
    task('pcl', function () {
        msbuild({
            file: 'src/SimpleJson/SimpleJson-Portable.csproj',
            targets: ['Build']
        })
    }, { async: true })

    desc('Build Portble Class Library (without LINQ Expression)')
    task('pclnolinq', function () {
        msbuild({
            file: 'src/SimpleJson/SimpleJson-Portable-NoLinqExpression.csproj',
            targets: ['Build']
        })
    }, { async: true })

    desc('Build Portble Class Library (WP8,WinStore,NET4.5)')
    task('pclnet45', function () {
        msbuild({
            file: 'src/SimpleJson/SimpleJson-Portable-WP8WinStoreNet45.csproj',
            targets: ['Build']
        })
    }, { async: true })

    desc('Build .NET 4.5')
    task('net45', function () {
        msbuild({
            file: 'src/SimpleJson/SimpleJson-Net45.csproj',
            targets: ['Build']
        })
    }, { async: true })

	desc('Build .NET 4.0')
	task('net40', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-Net40.csproj',
			targets: ['Build']
		})
	}, { async: true })

	desc('Build .NET 3.5')
	task('net35', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-Net35.csproj',
			targets: ['Build']
		})
	}, { async: true })

	desc('Build .NET 2.0')
	task('net20', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-Net20.csproj',
			targets: ['Build']
		})
	}, { async: true })

	desc('Build Silverlight 5')
	task('sl5', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-SL5.csproj',
			targets: ['Build']
		})
	}, { async: true })

	desc('Build Silverlight 4')
	task('sl4', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-SL4.csproj',
			targets: ['Build']
		})
	}, { async: true })

	desc('Build Windows Phone 7.0')
	task('wp70', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-WP7.csproj',
			targets: ['Build']
		})
	}, { async: true })

	desc('Build Windows Phone 7.1')
	task('wp71', function () {
	    msbuild({
	        file: 'src/SimpleJson/SimpleJson-WP71.csproj',
	        targets: ['Build']
	    })
	}, { async: true })

	desc('Build Windows Store')
	task('store', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-WindowsStore.csproj',
			targets: ['Build']
		})
	}, { async: true })

	task('all', ['build:net40', 'build:net35', 'build:net20', 'build:sl5', 'build:sl4', 'build:wp70', 'build:wp71', 'build:net45', 'build:store', 'build:pcl', 'build:pclnolinq', 'build:pclnet45'])

})

task('build', ['build:all'])

namespace('clean', function () {

    task('pcl', function () {
        msbuild({
            file: 'src/SimpleJson/SimpleJson-Portable.csproj',
            targets: ['Clean']
        })
    }, { async: true })

    task('pclnolinq', function () {
        msbuild({
            file: 'src/SimpleJson/SimpleJson-Portable-NoLinqExpression.csproj',
            targets: ['Clean']
        })
    }, { async: true })

    task('pclnet45', function () {
        msbuild({
            file: 'src/SimpleJson/SimpleJson-Portable-WP8WinStoreNet45.csproj',
            targets: ['Clean']
        })
    }, { async: true })

    task('net45', function () {
        msbuild({
            file: 'src/SimpleJson/SimpleJson-Net45.csproj',
            targets: ['Clean']
        })
    }, { async: true })

	task('net40', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-Net40.csproj',
			targets: ['Clean']
		})
	}, { async: true })

	task('net35', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-Net35.csproj',
			targets: ['Clean']
		})
	}, { async: true })

	task('net20', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-Net20.csproj',
			targets: ['Clean']
		})
	}, { async: true })

	task('sl5', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-SL5.csproj',
			targets: ['Clean']
		})
	}, { async: true })

	task('sl4', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-SL4.csproj',
			targets: ['Clean']
		})
	}, { async: true })

	task('wp70', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-WP7.csproj',
			targets: ['Clean']
		})
	}, { async: true })

	task('wp71', function () {
	    msbuild({
	        file: 'src/SimpleJson/SimpleJson-WP71.csproj',
	        targets: ['Clean']
	    })
	}, { async: true })

	task('store', function () {
		msbuild({
			file: 'src/SimpleJson/SimpleJson-WindowsStore.csproj',
			targets: ['Clean']
		})
	}, { async: true })

	task('all', ['clean:net40', 'clean:net35', 'clean:net20', 'clean:sl5', 'clean:sl4', 'clean:wp70', 'clean:wp71', 'clean:net45', 'clean:store', 'clean:pcl', 'clean:pclnolinq', 'clean:pclnet45'])

})

desc('Clean')
task('clean', ['clean:all'], function () {
	jake.rmRf('working/')
	jake.rmRf('bin/')
	jake.rmRf('dist/')
})

namespace('test-build', function () {
		
	task('net40', ['build:net40'], function () {
		msbuild({
			file: 'src/SimpleJson.Tests/SimpleJson.Tests.csproj',
			targets: ['Build']
		})
	}, { async: true })

	task('all', ['test-build:net40'])

})

namespace('test', function () {
	
	task('net40', ['test-build:net40'], function () {
		nunit({
			assemblies: ['bin/Tests/Net40/Release/SimpleJson.Tests.dll'],
			xml: 'bin/Tests/Net40/Release/SimpleJson.Tests.nunit.xml'
		})
	}, { async: true })

	task('all', ['test:net40'])

})

desc('test')
task('test', ['test:all'])

directory('working/')

namespace('generate', function () {
	
	desc('Generate SimpleJson.cs.pp at working/SimpleJson.cs.pp')
	task('csharp', ['working/'], function () {
		console.log('Generating working/SimpleJson.cs');

		var csFile = fs
			.readFileSync('src/SimpleJson/SimpleJson.cs', 'utf-8')
			.replace('// VERSION:', '// VERSION: ' + config.version)
			.replace('namespace SimpleJson', 'namespace $rootnamespace$')
			.replace('namespace SimpleJson', 'namespace $rootnamespace$')
			.replace('using SimpleJson.Reflection;', 'using $rootnamespace$.Reflection;')

		fs.writeFileSync('working/SimpleJson.cs.pp', csFile);
	})

	desc('Generate SimpleJson.psm1 at working/SimpleJson.psm1')
	task('powershell', ['working/'], function () {
		console.log('Generating working/SimpleJson.psm1');

		var psFile = fs
			.readFileSync('src/simplejson.script.ps1', 'utf-8')
			.replace('# Version:', '# Version: ' + config.version) + 
			'\r\n$source = @\"\r\n\r\n' + 
			'#define SIMPLE_JSON_DATACONTRACT\r\n' +
			'#define SIMPLE_JSON_REFLECTIONEMIT\r\n\r\n' +
			fs.readFileSync('src/SimpleJson/SimpleJson.cs', 'utf-8').replace('// VERSION:', '// VERSION: ' + config.version) +
			'\r\n\"@\r\n' + 
			'Export-ModuleMember ConvertFrom-Json\r\n' +
			'Export-ModuleMember ConvertTo-Json\r\n' + 
			'Add-Type -ReferencedAssemblies System.Runtime.Serialization -TypeDefinition $source -Language CSharp';

		fs.writeFileSync('working/SimpleJson.psm1', psFile);
	})

	task('all', ['generate:csharp', 'generate:powershell'])

})

directory('dist/')

namespace('nuget', function () {

	desc('Create nuget package')
	task('pack', ['generate:all', 'dist/'], function () {
		nuget.pack({
			nuspec: 'src/SimpleJson.nuspec',
			version: config.version,
			outputDirectory: 'dist/'
		})
	}, { async: true })

})
