\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{lecture-notes}[2019/07/04 LaTeX class for lecture notes]
\LoadClass[a4paper,12pt]{report}

\newif\if@russian

\DeclareOption{russian}{\@russiantrue}

\ProcessOptions\relax

\if@russian
    \RequirePackage[T2A]{fontenc}
    \RequirePackage[utf8]{inputenc}
    \RequirePackage[russian]{babel}

    % добавить точку после номера теоремы. LaTeX в примерах http://www.ccas.ru/voron/download/voron05latex.pdf
    \renewcommand{\@begintheorem}[2]{\par{\bf #1\ #2.\ }\samepage\begingroup\sl}
    \renewcommand{\@opargbegintheorem}[3]{\par{\bf #1\ #2\ (#3).\ }\samepage\begingroup\sl}
    \renewcommand{\@endtheorem}{\endgroup}
\fi

\renewcommand{\[}{\begin{equation}}
\renewcommand{\]}{\end{equation}}

\newtheorem{Theorem}{Теорема}
\newtheorem{Lemma}{Лемма}
\newtheorem{Definition}{Определение}
\newtheorem{Corollary}{Следствие}
\newenvironment{Proof}{\par\noindent{\bf Доказательство.}}{\hfill$\scriptstyle\blacksquare$}