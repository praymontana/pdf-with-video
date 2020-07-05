\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{lecture-notes}[2019/07/04 LaTeX class for lecture notes]
\LoadClass[a4paper,12pt]{article}

\newif\if@russian

\DeclareOption{russian}{\@russiantrue}

\ProcessOptions\relax

\if@russian
\RequirePackage[T2A]{fontenc}
\RequirePackage[utf8]{inputenc}
\RequirePackage[russian]{babel}
\RequirePackage{etoolbox}

% добавить точку после номера теоремы. LaTeX в примерах http://www.ccas.ru/voron/download/voron05latex.pdf
\renewcommand{\@begintheorem}[2]{\par{\bf #1\ #2.\ }\samepage\begingroup\sl}
\renewcommand{\@opargbegintheorem}[3]{\par{\bf #1\ #2\ (#3).\ }\samepage\begingroup\sl}
\renewcommand{\@endtheorem}{\endgroup}
\fi

\def\@title{Укажите заголовок с помощью команды \texttt{\textbackslash title}}
\def\@subtitle{}
\def\@date{}

\def\subtitle#1{\def\@subtitle{#1}}
\def\lecturer#1{\def\@lecturer{#1}}
\def\notesauthor#1{\def\@notesauthor{#1}}

\def\and{%
\end{tabular}\hskip 1em\begin{tabular}[t]{c}
}

\def\@maketitle{%
\newpage\null\vskip 2em%
\begin{center}%
\let\footnote\thanks%
{\LARGE \@title \par }
\ifdefempty{\@subtitle}{}{
\vskip 1em
{\large \@subtitle \par }
}
\vskip 1.5em
{\large \lineskip .5em
\begin {tabular}[t]{c}
\@lecturer
\end{tabular}\par
}
\end{center}%
{\large \lineskip .5em
запись конспекта:\hskip 1em
\begin{tabular}[t]{c}
\@notesauthor
\end{tabular}\par
}
\ifdefempty{\@date}{}{
    {\large \lineskip .5em
    дата лекции:
    \begin{tabular}[t]{c}
    \hskip 1em \@date
    \end{tabular}\par
    }
}
\par\vskip 1.5em
}

\renewcommand{\[}{\begin{equation}}
\renewcommand{\]}{\end{equation}}

\newtheorem{Theorem}{Теорема}
\newtheorem{Lemma}{Лемма}
\newtheorem{Definition}{Определение}
\newtheorem{Corollary}{Следствие}
\newenvironment{Proof}{\par\noindent{\bf Доказательство.}}{\hfill$\scriptstyle\blacksquare$}
