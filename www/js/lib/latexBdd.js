var baseTex=
"%----------------------------------------------------------------------------------------" +"\n"+
"%	PACKAGES AND OTHER DOCUMENT CONFIGURATIONS"+"\n"+
"%----------------------------------------------------------------------------------------"+"\n"+
"\n"+
"\\documentclass{article}"+"\n"+
"\n"+
"\\usepackage{fancyhdr} % Required for custom headers"+"\n"+
"\\usepackage{lastpage} % Required to determine the last page for the footer"+"\n"+
"\\usepackage{extramarks} % Required for headers and footers"+"\n"+
"\\usepackage[usenames,dvipsnames]{color} % Required for custom colors"+"\n"+
"\\usepackage{graphicx} % Required to insert images"+"\n"+
"\\usepackage{listings} % Required for insertion of code"+"\n"+
"\\usepackage[utf8]{inputenc}"+"\n"+
"\\usepackage[french]{babel}"+"\n"+
"\\usepackage[T1]{fontenc}"+"\n"+
"\\usepackage[adobe-utopia]{mathdesign}"+"\n"+
"\n"+
"\\usepackage{lipsum} % Used for inserting dummy 'Lorem ipsum' text into the template"+"\n"+
"\n"+
"\n"+
"\n"+
"% Margins"+"\n"+
"\\topmargin=-0.45in"+"\n"+
"\\evensidemargin=0in"+"\n"+
"\\oddsidemargin=0in"+"\n"+
"\\textwidth=6.5in"+"\n"+
"\\textheight=9.0in"+"\n"+
"\\headsep=0.25in"+"\n"+
"\n"+
"\\linespread{1.1} % Line spacing"+"\n"+
"\n"+
"% Set up the header and footer"+"\n"+
"\\pagestyle{fancy}"+"\n"+
"\\lhead{\\hmwkTitle} % Top left header"+"\n"+
"\\chead{\\hmwkClass} % Top center head"+"\n"+
"\\rhead{\\today}"+"\n"+
"\\lfoot{\\lastxmark} % Bottom left footer"+"\n"+
"\\cfoot{} % Bottom center footer"+"\n"+
"\\rfoot{Page\\ \\thepage\\ of\\ \\protect\\pageref{LastPage}} % Bottom right footer"+"\n"+
"\\renewcommand\\headrulewidth{0.4pt} % Size of the header rule"+"\n"+
"\\renewcommand\\footrulewidth{0.4pt} % Size of the footer rule"+"\n"+
"\n"+
"\\setlength\\parindent{0pt} % Removes all indentation from paragraphs"+"\n"+
"\n"+
"%----------------------------------------------------------------------------------------"+"\n"+
"%	CODE INCLUSION CONFIGURATION"+"\n"+
"%----------------------------------------------------------------------------------------"+"\n"+
"\n"+
"\n"+
"\\definecolor{blank}{rgb}{1,1,1}"+"\n"+"\n"+
"\\definecolor{lightgray}{rgb}{.7,.7,.7}"+"\n"+
"\\definecolor{darkgray}{rgb}{.4,.4,.4}"+"\n"+
"\\definecolor{purple}{rgb}{0.65, 0.12, 0.82}"+"\n"+
"\\definecolor{greenSoft}{rgb}{0.30, 0.70, 0.10}"+"\n"+
"\n"+
"\\lstdefinelanguage{JavaScript}{"+"\n"+
"  keywords={pour,de,faire,si,sinon,debut,alors,fin,tant que,chaque,dans,et,ou,est,initialiser,non,fonction,vrai,faux},"+"\n"+
"  keywordstyle=\\color{blue}\\textbf,"+"\n"+
"  identifierstyle=\\color{black},"+"\n"+
"  sensitive=false,"+"\n"+
"  comment=[l]{//},"+"\n"+
"  morecomment=[s]{/*}{*/},"+"\n"+
"  commentstyle=\\color{lightgray}\\itshape,"+"\n"+
"  stringstyle=\\color{red}\\normalfont,"+"\n"+
"  morestring=[b]',"+"\n"+
"  morestring=[b]\""+"\n"+
"}"+"\n"+
"\\newcommand\\keywordblue[1]{{\\color{blue}\\textbf{#1}}}"+"\n"+
"\\newcommand\\CodeSymbol[1]{{\\color{greenSoft}\\textbf{#1}}}"+"\n"+
"\\newcommand\\CodeNumber[1]{{\\color{purple}\\textbf{#1}}}"+"\n"+
"\\lstset{"+"\n"+
"   language=JavaScript,"+"\n"+
"   backgroundcolor=\\color{blank},"+"\n"+
"   extendedchars=true,"+"\n"+
"   basicstyle=\\footnotesize\\normalfont,"+"\n"+
"   showstringspaces=false,"+"\n"+
"   showspaces=false,"+"\n"+
"   numbers=left,"+"\n"+
"   numberstyle=\\footnotesize,"+"\n"+
"   numbersep=9pt,"+"\n"+
"   tabsize=2,"+"\n"+
"   breaklines=true,"+"\n"+
"   showtabs=false,"+"\n"+
"   captionpos=b,"+"\n"+
"   literate={Début}{{\\keywordblue{D\\'ebut}}}5"+"\n"+
"         {début}{{\\keywordblue{d\\'ebut}}}5"+"\n"+
"   			{à}{{\\keywordblue{\\`a}}}1"+"\n"+
"   			{>}{{\\CodeSymbol{$>$}}}1"+"\n"+
"   			{<}{{\\CodeSymbol{$<$}}}1"+"\n"+
"   			{+}{{\\CodeSymbol{$+$}}}1"+"\n"+
"   			{-}{{\\CodeSymbol{$-$}}}1"+"\n"+
"         {=}{{\\CodeSymbol{$=$}}}1"+"\n"+
"        	{:}{{\\CodeSymbol{$:$}}}1"+"\n"+	
"        	{1}{{\\CodeNumber{1}}}1"+"\n"+
"        	{2}{{\\CodeNumber{2}}}1"+"\n"+
"       	{3}{{\\CodeNumber{3}}}1"+"\n"+
"        	{4}{{\\CodeNumber{4}}}1"+"\n"+
"        	{5}{{\\CodeNumber{5}}}1"+"\n"+
"        	{6}{{\\CodeNumber{6}}}1"+"\n"+
"        	{7}{{\\CodeNumber{7}}}1"+"\n"+
"        	{8}{{\\CodeNumber{8}}}1"+"\n"+
"        	{9}{{\\CodeNumber{9}}}1"+"\n"+
"        	{0}{{\\CodeNumber{0}}}1"+"\n"+
" 		  	%{á}{{\\'a}}1 {ã}{{\\~a}}1 {é}{{\\'e}}1"+"\n"+
"}"+"\n"+
"\n"+
"\n"+
"%----------------------------------------------------------------------------------------"+"\n"+
"%	DOCUMENT STRUCTURE COMMANDS"+"\n"+
"%	Skip this unless you know what you're doing"+"\n"+
"%----------------------------------------------------------------------------------------"+"\n"+
"\n"+
"\\setcounter{secnumdepth}{0} % Removes default section numbers"+"\n"+
"\n"+
"\n"+
"\n"+
"%----------------------------------------------------------------------------------------"+"\n"+
"%	NAME AND CLASS SECTION"+"\n"+
"%----------------------------------------------------------------------------------------"+"\n"+
"\n"+
"\\newcommand{\\hmwkTitle}{} % Assignment title"+"\n"+
"\\newcommand{\\hmwkClass}{Théorie des Graphes } % Course/class"+"\n"+
"\n"+
"%----------------------------------------------------------------------------------------"+"\n"+
"\n"+
"\\begin{document}"+"\n"+
"\n";


var endTex=
"\n"+
"\\end{document}";

sectionTex= function(titleSection,imgGraphe,notifList,ps){
 
  var section = 
  "\\section{"+titleSection+"}"+"\n"+
  "\n"+
  "\\begin{center}"+"\n"+
  "\\includegraphics[width=0.75\\columnwidth]{images/"+imgGraphe+"} % Example image"+"\n"+
  "\\end{center}"+"\n";
  if(!(ps == "")){

    section +=
    "%\\clearpage"+"\n"+
    "\\begin{lstlisting}"+"\n"+ps+"\n"+    
    "\n"+
    "\\end{lstlisting}"+"\n";
  }
  console.log(section);
  return section;
}

sectionTexNonCorrige= function(titleSection,imgGraphe){
 
  var section = 
  "\\section{"+titleSection+"}"+"\n"+
  "\n"+
  "\\begin{center}"+"\n"+
  "\\includegraphics[width=0.75\\columnwidth]{images/"+imgGraphe+"} % Example image"+"\n"+
  "\\end{center}"+"\n";
  console.log(section);
  return section;
}



//typeList[{algo:"parcoursLargeur", notifList: 0 ou 1, pseudoCode:0,1}]
exportToTex = function(listAlgo,bCorrige,Ngenarete){

  var imageFolder = [];
  var latex = baseTex;
  var first = true;

  if(bCorrige){
    monGraphe.G.nodes().css({"color":"#000"});
    monGraphe.G.edges().css({"color":"#000"});
    //export tous les corrigé de listAlgo
    for(var i = 0; i < listAlgo.length; i++){
      var elt = listAlgo[i];
      if(first){monGraphe[elt.algo+"Export"].apply(monGraphe, {"length":1, "0":1 }); first = false;}
      else{
        setTimeout(
          function(){
            monGraphe[elt.algo+"Export"].apply(monGraphe, {"length":1, "0":1 });
          },501*(i));         
      }
      setTimeout(
        function(imageFolder,algo) {
            takeGrapheImg(imageFolder,algo);           
            monGraphe.clearGraphe();
          },500*(i+1),imageFolder,elt.algo);  
             
    }
    setTimeout(
      function(){
        for(var i = 0; i < listAlgo.length; i++){
          var elt = listAlgo[i];
          var context =  window[elt.algo+"_D"];
          var tmpNalgo = elt.algo;
          latex += sectionTex(context.titre,elt.algo,"",pseudoCode[tmpNalgo]);
        }
        finalizeExport(imageFolder,latex,Ngenarete);
        monGraphe.G.nodes().css({"color":"#fff"});
        monGraphe.G.edges().css({"color":"#fff"});

      },500*(listAlgo.length+1));
  }
  else{
    //export l'image du graphe//
    monGraphe.G.nodes().css({"color":"#000"});
    monGraphe.G.edges().css({"color":"#000"});
    takeGrapheImg(imageFolder,Ngenarete);
    latex += sectionTexNonCorrige(Ngenarete,Ngenarete);
    latex += endTex;
    finalizeExport(imageFolder,latex,Ngenarete);
    monGraphe.G.nodes().css({"color":"#fff"});
    monGraphe.G.edges().css({"color":"#fff"});
  }

  
}


 finalizeExport = function(imageFolder, latex, Ngenarete){
  latex += endTex;
  var zip = new JSZip();
  zip.file("main.tex", latex);

  //Genere Images If exist
  if(imageFolder.length >0){
    var img = zip.folder("images");
    for(var i=0; i<imageFolder.length; i++){
      var elt = imageFolder[i];
      img.file(elt.name+".png",elt.data, {base64: true});
    }
  }
  //Save Zip On user
  var content = zip.generate({type:"blob"});
  saveAs(content, Ngenarete+".zip");

}


//imageList type[{name:"image",data:'lejqfmlkjefmljkqmokfo'}]
//
takeGrapheImg = function(folder,Nimage){

  var imageGraphe = monGraphe.G.png({full:true});
  folder.push({name:Nimage,data:imageGraphe.split("data:image/png;base64,")[1]});
}

