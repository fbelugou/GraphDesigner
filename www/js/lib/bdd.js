//////////////////////////////////////////////
//										 /////
//	Base de donnee algorithme description ////
//	titre,description,imagePath,complexité ///
//////////////////////////////////////////////

//Descriptions
var parcoursProfondeurDesc = "<big><b>Description:</b></big>"
	+"<br>L\'algorithme de parcours en profondeur (ou DFS, pour Depth First Search) est un algorithme de parcours de graphe qui se décrit naturellement de manière récursive. Son application la plus simple consiste à déterminer s\'il existe un chemin d\'un sommet à un autre. Trémaux et Tarry ont, chacun de leur côté, formulé des algorithmes de parcours en profondeur dès le XIXe siècle."
	+"<br><br>Pour les graphes non orientés, le parcours en profondeur correspond à la méthode intuitive qu\'on utilise pour trouver la sortie d\'un labyrinthe sans tourner en rond. <b>Charles Pierre Trémaux</b> en propose une solution rigoureuse citée par <b>Édouard Lucas</b> (1891) dans ses <i>Récréations mathématiques</i>. <b>Gaston Tarry</b> en donne une autre solution."
	+"<br><br><big><b>Principe:</b></big>"
	+"<br>C'est un algorithme de recherche qui progresse à partir d'un sommet S en s'appelant récursivement pour chaque sommet voisin de S."
	+"Le nom d'algorithme en profondeur est dû au fait que, contrairement à l'algorithme de parcours en largeur, il explore en fait « à fond » les chemins un par un : pour chaque sommet, il marque le sommet actuel, et il prend le premier sommet voisin jusqu'à ce qu'un sommet n'ait plus de voisins (ou que tous ses voisins soient marqués), et revient alors au sommet père."
	+"Si G n'était pas un arbre, l'algorithme pourrait tourner indéfiniment, c'est pour cela que l'on doit en outre marquer chaque sommet déjà parcouru, et ne parcourir que les sommets non encore marqués."
	+"Dans le cas d'un arbre, le parcours en profondeur est utilisé pour caractériser l'arbre."
	+"Enfin, on notera qu'il est tout à fait possible de l'implémenter itérativement à l'aide d'une pile LIFO contenant les sommets à explorer : on désempile un sommet et on empile ses voisins non encore explorés."
	+"<br><br><big><b>Pseudo-Code:</b></big>"
	+"<br><pre><b>DFS</b> (graphe G, sommet s)"
	+"<br>{"
	+"<br>  <b>Marquer</b>(s);"
	+"<br>  <i>POUR CHAQUE</i> élément s_fils de Voisins(s) <i>FAIRE</i>"
	+"<br>     <i>SI</i> <b>NonMarqué</b>(s_fils) <i>ALORS</i>"
	+"<br>       <b>DFS</b>(G,s_fils);"
	+"<br>     <i>FIN-SI</i>"
	+"<br>  <i>FIN-POUR</i>"
	+"<br>}"
	+"</pre>";

var parcoursLargeurDesc = '<big><b>Description :</b></big>'
+ "Cet algorithme diffère de l'algorithme de parcours en profondeur par le fait que, à partir d'un sommet S, il liste d'abord les voisins de S pour ensuite les explorer un par un. Ce mode de fonctionnement utilise donc une file dans laquelle il prend le premier sommet et place en dernier ses voisins non encore explorés."
+ "Lorsque l'algorithme est appliqué à un graphe quelconque, les sommets déjà visités doivent être marqués afin d'éviter qu'un même sommet soit exploré plusieurs fois. Dans le cas particulier d'un arbre, ce n'est pas nécessaire."
+ "Étapes de l'algorithme&nbsp;:</p>"
+ "<ol><li>Mettre le nœud de départ dans la file.</li><li>Retirer le nœud du début de la file pour l'examiner.</li><li>Mettre tous les voisins non examinés dans la file (à la fin).</li><li>Si la file n'est pas vide reprendre à l'étape 2.</li></ol>"
+ "Note&nbsp;: l'utilisation d'une pile au lieu d'une file d'attente transformerait cet algorithme en un algorithme de parcours en profondeur."
+ "<pre><b>ParcoursLargeur</b>(Sommet s):"
+"<br>{"
+"<br> f = CreerFile();"
+"<br>  f.enfiler(s);"
+"<br>  marquer(s);"
+"<br>  TANT-QUE NON f.vide() FAIRE"
+"<br>      s = f.defiler();"
+"<br>      afficher(s);"    
+"<br>      POUR TOUT voisin de s FAIRE"
+"<br>           SI voisin non marqué FAIRE"
+"<br>                f.enfiler(voisin);"
+"<br>                marquer(voisin);"
+"<br>           FIN SI"
+"<br>      FIN POUR TOUT" 
+"<br>  FIN TANT QUE"       
+"<br> }"
+"</pre>";

var kruskalDesc = '<big><b>Description :</b></big><br><br>'
+ "L'<b>algorithme de Kruskal</b> est un algorithme de recherche d'arbre recouvrant de poids minimum (ARPM) ou arbre couvrant minimum (ACM) dans un graphe connexe valué et non-orienté. Il a été conçu en 1956 par <b>Joseph Kruskal</b>."
+ "<br><br>L'algorithme consiste à d'abord ranger par ordre de poids croissant les arêtes d'un graphe, puis à retirer une à une les arêtes selon cet ordre et à les ajouter à l'ACM cherché tant que cet ajout ne fait pas apparaître un cycle dans l'ACM."
+ "<br><br><pre>Kruskal(G, w) :"
+"<br>   A := ø"
+"<br>   <b>pour</b> chaque sommet v de G :"
+"<br>      créerEnsemble(v)"
+"<br>   trier les arêtes de G par ordre croissant de poids w"
+"<br>   <b>pour</b> chaque arête (u, v) de G prise par ordre de poids croissant :"
+"<br>      <b>si</b> find(u) ≠ find(v) :"
+"<br>        ajouter l'arête (u, v) à l'ensemble A"
+"<br>         union(u, v)"
+"<br>   <b>retourner</b> A"
+"</pre>";

var dijkstraDesc = 'En théorie des graphes, l\'<b>algorithme de Dijkstra</b> sert à résoudre le problème du plus court chemin. Il permet, par exemple, de déterminer le plus court chemin pour se rendre d\'une ville à une autre connaissant le réseau routier d\'une région. Il s\'applique à un graphe connexe dont le poids lié aux arêtes est un réel positif.'
+ "<br><br>L'algorithme porte le nom de son inventeur, l'informaticien néerlandais Edsger Dijkstra, et a été publié en 1959."
+ "<br><br>Cet algorithme est de complexité polynomiale."
+ "<br><br><pre> <b>Fonction</b> Dijkstra (nœuds, fils, distance, début, fin)"
+"<br>     <b>Pour</b> n parcourant nœuds"
+"<br>         n.parcouru = infini   "
+"<br>         n.précédent = 0"
+"<br>     <b>Fin pour</b>"
+"<br>     début.parcouru = 0"
+"<br>     pasEncoreVu = nœuds"
+"<br>     <b>Tant que</b> pasEncoreVu != liste vide"
+"<br>         n1 = minimum(pasEncoreVu)   "
+"<br>         pasEncoreVu.enlever(n1)"
+"<br>         <b>Pour</b> n2 parcourant fils(n1)   "
+"<br>             <b>Si</b> n2.parcouru &gt; n1.parcouru + distance(n1, n2)   "
+"<br>                 n2.parcouru = n1.parcouru + distance(n1, n2)"
+"<br>                 n2.précédent = n1   "
+"<br>             <b>Fin si</b>"
+"<br>         <b>Fin pour</b>"
+"<br>     <b>Fin tant que</b>"
+"<br>     chemin = liste vide"
+"<br>     n = fin"
+"<br>     <b>Tant que</b> n != début"
+"<br>         chemin.ajouterAvant(n)"
+"<br>         n = n.précédent"
+"<br>     <b>Fin tant que</b>"
+"<br>     chemin.ajouterAvant(début)"
+"<br>     <b>Retourner</b> chemin"
+"<br> <b>Fin fonction</b> Dijkstra"
+"</pre>";

var gloutonDesc ="<big><b>Description:</b></big>"
	+"<br>Un algorithme glouton (greedy algorithm en anglais, parfois appelé aussi algorithme gourmand) est un algorithme qui suit le principe de faire, étape par étape, un choix optimum local. Dans certains cas cette approche permet d'arriver à un optimum global, mais dans le cas général c'est une heuristique. L'illustration ci-contre montre un cas où ce principe est mis en échec."
	+"<br><br><big><b>Principe:</b></big>"
	+"<br>Le principe de l'algorithme glouton (greedy algorithm) : faire toujours un choix localement optimal dans l'espoir que ce choix m'enera à une solution globalement optimale."
	+"<br>On cherche à obtenir une coloration des sommets d'un graphe qui satisfasse à la contrainte suivante : deux sommets voisins n’ont jamais la même couleur"
	+"<br>On cherche à optimiser le nombre de couleurs utilisées. Le plus petit nombre de couleurs permettant la coloration est appelé nombre chromatique du graphe."
	+"<br><br><big><b>Pseudo-Code:</b></big>"
	+"<br>"
	+"<br><pre> Glouton"
    +"<br>Entrée : liste ordonnée V des n sommets d\'un graphe G"
    +"<br>         liste ordonnée C de couleurs"
    +"<br>" 
    +"<br>Pour i variant de 1 à n"
    +"<br>  v = V[i]"
    +"<br>  couleur = la première couleur de C non utilisée par les voisins de v"
    +"<br>  colorier(v, couleur)"
    +"<br>Fin pour"
	+"</pre>";

var colorNaifDesc = "Cet algorithme est simple à comprendre et facile à mettre en oeuvre mais...gourmand en couleurs"
+"<br>L’idée est élémentaire. On attribue à chaque sommet la plus petite couleur non encore attribuée"
+"à un de ses voisins."
+"<br><br><br><br><br><br><pre>DEBUT"
+"<br>{On initialise le tableau à 0, (qui n’est pas une couleur)}"
+"<br>Pour i de 1 à n Faire C[i]:=0;"
+"<br>{On détermine la couleur de chaque sommet}"
+"<br>Pour x de 1 à n Faire"
+"<br>Début"
+"<br>{Chercher la plus petite couleur non attribuée à un voisin de x}"
+"<br>S:=[];"
+"<br>Pour chaque voisin y de x Faire"
+"<br>Si C[j]<>0 alors ajouter (C[j],S);"
+"<br>{S contient alors toutes les couleurs interdites}"
+"<br>C[i]:=min(S)"
+"<br>Fin"
+"<br>FIN";


//Parcours
var parcoursProfondeur_D = {imageClass:"images/parcoursW.png",image: "images/edouardLucas.jpg", titre:"Parcours en profondeur", desc:parcoursProfondeurDesc, image: "images/edouardLucas.jpg", complexite:"", cmd:"parcoursProfondeur", args:{"length":1, "0":1 } };
var parcoursLargeur_D = {imageClass:"images/parcoursW.png", titre:"Parcours en Largeur", desc:parcoursLargeurDesc, image: "images/bfs.jpg", complexite:"", cmd:"parcoursLargeur", args:{"length":1, "0":1 } };

//Arbre
var kruskal_D = {imageClass:"images/arbreW.png", titre:"Kruskal", desc:kruskalDesc, image: "images/kruskal.jpg", complexite:"",cmd:"kruskal_cmd", args:{"length":1, "0":1 } };
var prim_D = {titre:"Prim", desc:"", image: "images/Robert-C-Prim.jpg", complexite:"",cmd:"prim", args:{"length":1, "0":1 } };

//Chemins
var circuitEulerien_D = {titre:"Circuit Eulerien", desc:"", image: "images/euler.jpg", complexite:"", cmd:"circuitEulerien", args:{"length":1, "0":1 } };
var cheminEulerien_D = {titre:"Chemin Eulerin", desc:"", image: "images/euler.jpg", complexite:"", cmd:"cheminEulerien", args:{"length":1, "0":1 } };
var dijkstra_D = {imageClass:"images/courtCheminW.png", titre:"Disjkstra", desc:dijkstraDesc, image: "images/dijkstra.jpg", complexite:"", cmd:"dijkstra_cmd", args:{"length":1, "0":1 } };
var bellman_D = {titre:"Bellman", desc:"", image: "images/bellman.jpg", complexite:"", cmd:"bellman", args:{"length":1, "0":1 } };

//Coloration
var naif_D = {titre:"Naif",imageClass:"images/painterW.png", desc:colorNaifDesc, image: "images/naif.jpg", complexite: "", cmd:"naif", args:{"length":1, "0":1 } };
var glouton_D = {titre:"Glouton", imageClass:"images/painterW.png", desc:gloutonDesc, image: "images/glouton.jpg", complexite: "", cmd:"glouton", args:{"length":1, "0":1 } }; 


var pseudoCode={

	"parcoursProfondeur":
	"initialiser M  à faux;"+"\n"+
	"Profond (G,x) : //parcours en profondeur du graphe G à partir du sommet x"+"\n"+
	"Début"+"\n"+
	"M[x]:=vrai;[1]"+"\n"+
	"Pour chaque successeur y de x faire"+"\n"+
	"	Début"+"\n"+
	"	Si M[y]=faux alors"+"\n"+
	"		début"+"\n"+
	"			M[y]:=vrai;"+"\n"+
	"			profond(G,y)"+"\n"+
	"		fin"+"\n"+
	"	fin"+"\n"+
	"	[2]"+"\n"+
	"fin."+"\n",

	"parcoursLargeur":
	"initialiser M à Faux;"+"\n"+
	"largeur (G,x) : //parcours en largeur du graphe G a partir du sommet x"+"\n"+
	"F:=[x];M[x]:=vrai"+"\n"+
	"tant que F<>[] faire"+"\n"+
	"	Début"+"\n"+
	"	y:=enleveTete(F);"+"\n"+
	"	[3]"+"\n"+
	"	pour chaque successeur z de y Faire"+"\n"+
	"	Début"+"\n"+
	"		Si M[z]=faux alors"+"\n"+
	"			Debut"+"\n"+
	"				M[z]:=vrai"+"\n"+
	"				ajouterFin(z,F)"+"\n"+
	"			Fin"+"\n"+
	"	Fin"+"\n"+
	"Fin"+"\n",

	"kruskal":
	"Kruskal(G, w)"+"\n"+
	"A := vide"+"\n"+
	"pour chaque sommet v de G faire"+"\n"+
	"	Début"+"\n"+
	"		créerEnsemble(v)"+"\n"+
	"	Fin"+"\n"+
	"trier les arêtes de G par ordre croissant de poids w"+"\n"+
	"\n"+
	"pour chaque arête (u, v) de G prise par ordre de poids croissant faire"+"\n"+
	"	Début"+"\n"+
	"		si find(u) <> find(v) alors"+"\n"+
	"		Début"+"\n"+
	"			ajouter l'arête (u, v) à l'ensemble A"+"\n"+
	"			union(u, v)"+"\n"+
	"		Fin"+"\n"+
	"	Fin"+"\n"+
	"retourner A"+"\n"+
	"/*w est une fonction qui associe à chaque arête du graphe G une valeur qui est son poids. Les fonctions créerEnsemble, find et union sont les trois opérations d'une structure Union-Find – qui, respectivement, renvoie un élément représentatif d'un ensemble et fusionne deux ensembles."+"\n"+
	"On remarquera que lors du déroulement de l'algorithme, l'ACM n'est pas nécessairement connexe, il ne le sera qu'à la fin.*/"+"\n",
	
}