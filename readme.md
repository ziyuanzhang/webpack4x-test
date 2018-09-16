4.x 
1.  全局/本地都需要安装
2. 需要安装webpack-cli
3. 需要写开发模式：mode
4. 输出路径需要加：__dirname组合
5. mini-css-extract-plugin 替换 extract-text-webpack-plugin@next 
6. 用 devServer 插件时生成的文件必须有一个index.html
7. NODE_ENV不是内部或外部命令,也不是可运行的程序-------
    解决办法：安装across-env:npm install cross-env --save-dev
    在运行命令加前缀：在NODE_ENV=xxxxxxx前面添加cross-env就可以了。 

8.使用 webpack-dev-server 生成的文件存在内存中，文件件中是没有的